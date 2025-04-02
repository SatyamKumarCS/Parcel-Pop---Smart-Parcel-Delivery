import { useToast } from '@/hooks/use-toast';
import axiosApiCall from '@/utils/axiosApiCall';
import formatDate from '@/utils/formateDate';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Check, Truck, Clock, XCircle, RefreshCw } from 'lucide-react';
import Page from '@/components/Page';
import Section from '@/components/Section';
import { motion } from 'motion/react';
import thanks from '@/assets/SVG/thanks.svg';
// Step-based status component with animations
const StatusSteps = ({ status }) => {
    const steps = [
        { id: 'Pending', icon: <Clock className="w-5 h-5" />, label: 'Pending' },
        { id: 'On The Way', icon: <Truck className="w-5 h-5" />, label: 'On The Way' },
        { id: 'Delivered', icon: <Check className="w-5 h-5" />, label: 'Delivered' },
        { id: 'Returned', icon: <RefreshCw className="w-5 h-5" />, label: 'Returned' },
        { id: 'Cancelled', icon: <XCircle className="w-5 h-5" />, label: 'Cancelled' },
    ];

    const currentStepIndex = steps.findIndex(step => step.id === status);

    return (
        <div className="flex mobile-lg:flex-col items-start justify-between gap-3">
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                            index <= currentStepIndex
                                ? 'bg-blue-500 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-500'
                        }`}
                    >
                        {step.icon}
                    </div>
                    <span
                        className={`text-sm font-medium transition-all duration-300 ${
                            index <= currentStepIndex ? 'text-blue-500' : 'text-gray-500'
                        }`}
                    >
                        {step.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
};

export default function TrackParcelPage() {
    const { toast } = useToast();
    const { Parcel_id } = useParams();
    const [parcelData, setParcelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchParcelData = async () => {
            try {
                const response = await axiosApiCall.get(`/api/parcel/parcelById/${Parcel_id}`);
                setParcelData(response.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching parcel data:', error);
                setIsError(true);
                setIsLoading(false);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch parcel data.',
                    variant: 'destructive',
                });
            }
        };

        if (Parcel_id) fetchParcelData();
    }, [Parcel_id, toast]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <motion.div
                    className="text-center p-5 text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex items-center justify-center h-screen">
                <motion.div
                    className="text-center p-5 text-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    Error loading parcel data.
                </motion.div>
            </div>
        );
    }

    return (
        <Page>
            <Section>
                <motion.div
                    className="max-w-2xl mx-auto p-6 bg-card dark:bg-dark-card shadow-lg rounded-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <img src={thanks} className="w-full max-h-[40vh]" alt="" />
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">Parcel Tracking</h1>
                    <p className="text-gray-600 mb-4">
                        <span className="font-semibold">Parcel ID:</span> {Parcel_id}
                    </p>
                    {parcelData ? (
                        <div className="space-y-4">
                            <div className="mb-6">
                                <StatusSteps status={parcelData.status} />
                            </div>
                            <div className="space-y-3">
                                <p className="text-gray-600">
                                    <span className="font-semibold">Status:</span>{' '}
                                    {parcelData.status}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Sender:</span>{' '}
                                    {parcelData.userName}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Receiver:</span>{' '}
                                    {parcelData.receiverName}
                                </p>
                                <p className="text-gray-600">
                                    <span className="font-semibold">Receiver Phone:</span>{' '}
                                    {parcelData.receiverPhone}
                                </p>

                                <p className="text-gray-600">
                                    <span className="font-semibold">Estimated Delivery:</span>{' '}
                                    {formatDate(parcelData.approximateDeliveryDate)}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600">No tracking data available.</p>
                    )}
                </motion.div>
            </Section>
        </Page>
    );
}
