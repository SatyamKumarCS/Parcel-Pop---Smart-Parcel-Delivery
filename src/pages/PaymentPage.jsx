import CheckoutForm from '@/components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router';

const stripePromise = loadStripe(
    'pk_test_51Qj5jIKvt346YqfbiajHjYu6hVhVhu59dXq5SekueFvgKnZh7KASUhXn9SIdmAO9o3lzfUzR4ri5STNZd4duqYyK009tw4wHZr'
);

const PaymentPage = () => {
    const location = useLocation();
    const { parcelId, amount } = location.state || {};
    console.log(parcelId, amount);

    if (!parcelId || !amount) {
        return <p>Error: Missing payment details.</p>;
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm parcelId={parcelId} amount={amount} />
            </Elements>
        </div>
    );
};

export default PaymentPage;
