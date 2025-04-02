import { useEffect, useState } from 'react';
import axiosApiCall from '@/utils/axiosApiCall';
import { Card } from '@/components/ui/card';
import { Alert } from '@/components/ui/alert';
import Chart from 'react-apexcharts';

const ParcelStatistics = () => {
    const [barChartData, setBarChartData] = useState({
        categories: [],
        series: [],
    });
    const [lineChartData, setLineChartData] = useState({
        categories: [],
        series: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatisticsData = async () => {
            try {
                const response = await axiosApiCall.get('/api/parcel/statisticsData');
                const { barChartData: barData, lineChartData: lineData } = response.data.data;

                // Transform data for bar chart
                const barCategories = barData.map(item => item.date);
                const barSeries = barData.map(item => item.totalBookings);

                // Transform data for line chart
                const lineCategories = lineData.map(item => item.date);
                const bookedSeries = lineData.map(item => item.booked);
                const deliveredSeries = lineData.map(item => item.delivered);

                setBarChartData({
                    categories: barCategories,
                    series: [{ name: 'Total Bookings', data: barSeries }],
                });

                setLineChartData({
                    categories: lineCategories,
                    series: [
                        { name: 'Booked Parcels', data: bookedSeries },
                        { name: 'Delivered Parcels', data: deliveredSeries },
                    ],
                });

                setLoading(false);
            } catch {
                setError('Failed to fetch statistics data.');
                setLoading(false);
            }
        };

        fetchStatisticsData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Alert variant="destructive">{error}</Alert>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-6">Parcel Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Bar Chart */}
                <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Bookings by Date</h2>
                    <Chart
                        options={{
                            chart: { type: 'bar' },
                            xaxis: { categories: barChartData.categories },
                            title: { text: 'Bookings by Date', align: 'center' },
                        }}
                        series={barChartData.series}
                        type="bar"
                        height={300}
                    />
                </Card>

                {/* Line Chart */}
                <Card className="p-4">
                    <h2 className="text-xl font-semibold mb-4">Booked vs Delivered Parcels</h2>
                    <Chart
                        options={{
                            chart: { type: 'line' },
                            xaxis: { categories: lineChartData.categories },
                            title: { text: 'Booked vs Delivered Parcels', align: 'center' },
                            stroke: { curve: 'smooth' },
                        }}
                        series={lineChartData.series}
                        type="line"
                        height={300}
                    />
                </Card>
            </div>
        </div>
    );
};

export default ParcelStatistics;
