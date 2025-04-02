import { useEffect, useState } from 'react';
import axiosApiCall from '@/utils/axiosApiCall'; // Import your axiosApiCall function
import { User, Package, Star } from 'lucide-react'; // Import Lucide icons

const TopDeliveryMen = () => {
    const [topDeliveryMen, setTopDeliveryMen] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch top delivery men data
    const fetchTopDeliveryMen = async () => {
        try {
            const response = await axiosApiCall('/api/parcel/topDeliveryMan');
            if (response.data.success) {
                setTopDeliveryMen(response.data.data);
            } else {
                setError('Failed to fetch top delivery men.');
            }
        } catch {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTopDeliveryMen();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <section className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">Top 3 Delivery Men</h2>
            <div className="flex justify-center gap-8 flex-wrap">
                {topDeliveryMen?.map((deliveryMan, index) => (
                    <div
                        key={index}
                        className="w-80 bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="p-6 flex flex-col items-center">
                            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-blue-500">
                                <img
                                    src={
                                        deliveryMan.profileImage ||
                                        'https://via.placeholder.com/150'
                                    }
                                    alt={deliveryMan.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/10"></div>
                            </div>
                            <h3 className="text-xl font-semibold mt-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-500" />
                                {deliveryMan.name}
                            </h3>
                            <div className="mt-4 text-center space-y-2">
                                <p className="flex items-center justify-center gap-2">
                                    <Package className="w-5 h-5 text-green-500" />
                                    <strong>
                                        Parcels Delivered:
                                        {deliveryMan.totalParcelsDelivered}
                                    </strong>
                                </p>
                                <p className="flex items-center justify-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    <strong>
                                        Average Rating:
                                        {deliveryMan.averageRating
                                            ? deliveryMan?.averageRating.toFixed(1)
                                            : '0'}
                                    </strong>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TopDeliveryMen;
