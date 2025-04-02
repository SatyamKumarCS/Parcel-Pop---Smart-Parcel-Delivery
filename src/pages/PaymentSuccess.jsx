import ReactConfetti from 'react-confetti';

const PaymentSuccess = ({ parcelId }) => {
    return (
        <div>
            <ReactConfetti />
            <h1>Payment Successful!</h1>
            <p>Your parcel {parcelId} has been paid for successfully.</p>
        </div>
    );
};

export default PaymentSuccess;
