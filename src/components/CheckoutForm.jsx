import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router';
import axiosApiCall from '@/utils/axiosApiCall';

const CheckoutForm = ({ parcelId, amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        try {
            setPaymentProcessing(true);

            const response = await axiosApiCall.post('/api/create-payment-intent', {
                price: amount,
                parcelId,
            });
            const clientSecret = response.data.clientSecret;
            console.log(response.data.clientSecret);

            const paymentResult = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card, billing_details: { name: 'Test User' } },
            });

            if (paymentResult.error) {
                toast({
                    title: 'Payment Failed',
                    description: paymentResult.error.message,
                    variant: 'destructive',
                });
            } else if (paymentResult.paymentIntent.status === 'succeeded') {
                await axiosApiCall.post(`/api/parcel/payment-success/${parcelId}`, {
                    paymentIntentId: paymentResult.paymentIntent.id,
                });

                console.log('Successful');

                toast({
                    title: 'Payment Successful',
                    description: 'Your payment has been completed.',
                });
                navigate('/payment-success');
            }
        } catch (error) {
            console.error('Payment error:', error);
            toast({
                title: 'Error',
                description: 'An unexpected error occurred.',
                variant: 'destructive',
            });
        } finally {
            setPaymentProcessing(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-200"
        >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Complete Payment</h2>
            <p className="text-gray-600 mb-6">
                Amount: <span className="font-medium text-gray-800">${amount}</span>
            </p>
            <div className="mb-4">
                <CardElement
                    className="p-3 border border-gray-300 rounded-md"
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>
            <button
                disabled={!stripe || paymentProcessing}
                className={`w-full py-2 px-4 text-white font-medium rounded-md bg-blue-500 hover:bg-blue-600 transition duration-200 ${
                    paymentProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {paymentProcessing ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default CheckoutForm;
