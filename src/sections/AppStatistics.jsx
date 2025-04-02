import { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import axiosApiCall from '@/utils/axiosApiCall';
import Section from '@/components/Section';
import { Package, Truck, Users } from 'lucide-react';

const AppStatistics = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setIsLoading(true);
                const response = await axiosApiCall.get('/api/parcel/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <Section className="  w-full">
            <div className="relative   flex items-center  ">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center w-full">
                    {/* Total Parcels Booked */}
                    <div className="flex flex-col items-center p-5 bg-blue-300/30 backdrop-blur-lg rounded-xl">
                        <Package className="h-10 w-10 text-blue-500 mb-2" />
                        <h4 className="text-lg font-semibold">Total Parcels Booked</h4>
                        {isLoading ? (
                            <div className="h-7 w-7 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mt-2"></div>
                        ) : (
                            <CountUp
                                start={0}
                                end={stats?.totalParcelsBooked || 0}
                                duration={2.5}
                                className="text-3xl font-bold text-blue-600"
                            />
                        )}
                    </div>

                    {/* Total Parcels Delivered */}
                    <div className="flex flex-col items-center p-5 bg-green-300/30 backdrop-blur-lg rounded-xl">
                        <Truck className="h-10 w-10 text-green-500 mb-2" />
                        <h4 className="text-lg font-semibold">Total Parcels Delivered</h4>
                        {isLoading ? (
                            <div className="h-7 w-7 border-2 border-green-500 border-t-transparent rounded-full animate-spin mt-2"></div>
                        ) : (
                            <CountUp
                                start={0}
                                end={stats?.totalParcelsDelivered || 0}
                                duration={2.5}
                                className="text-3xl font-bold text-green-600"
                            />
                        )}
                    </div>

                    {/* Total Users */}
                    <div className="flex flex-col items-center p-5 bg-purple-300/30 backdrop-blur-lg rounded-xl">
                        <Users className="h-10 w-10 text-purple-500 mb-2" />
                        <h4 className="text-lg font-semibold">Total Users</h4>
                        {isLoading ? (
                            <div className="h-7 w-7 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mt-2"></div>
                        ) : (
                            <CountUp
                                start={0}
                                end={stats?.totalUsers || 0}
                                duration={2.5}
                                className="text-3xl font-bold text-purple-600"
                            />
                        )}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default AppStatistics;
