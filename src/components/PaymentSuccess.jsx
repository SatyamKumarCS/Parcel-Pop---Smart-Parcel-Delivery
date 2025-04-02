import ConfettiExplosion from 'react-confetti-explosion';

const PaymentSuccess = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ConfettiExplosion />
            <h2 className="text-2xl font-bold text-green-600 mt-4">Payment Successful!</h2>
            <p className="text-gray-600 mt-2">Thank you for your payment.</p>
        </div>
    );
};

export default PaymentSuccess;
