import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import axiosApiCall from '@/utils/axiosApiCall';
import ParcelTable from '@/components/MyBooking/ParcelTable';

const MyBookingPage = () => {
    const { user } = useAuth();
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        if (user?.user?._id) {
            const fetchParcels = async () => {
                try {
                    setLoading(true);
                    const response = await axiosApiCall.get(
                        `/api/parcel/myParcel/${user.user._id}`
                    );
                    setParcels(response.data.data);
                } catch (error) {
                    console.error('Error fetching parcels:', error);
                    toast.error('Failed to fetch parcels.');
                } finally {
                    setLoading(false);
                }
            };
            fetchParcels();
        }
    }, [user, toast]);

    return (
        <div className="mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">My Parcels</h2>
            {loading ? <p>Loading</p> : <ParcelTable parcels={parcels} setParcels={setParcels} />}
        </div>
    );
};

export default MyBookingPage;
