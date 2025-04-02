import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import axiosApiCall from '@/utils/axiosApiCall';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';

const MyReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosApiCall.get('/api/parcel/reviews/my-reviews');
                setReviews(response.data.reviews);
            } catch {
                setError('Failed to fetch reviews. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) return <p>Loading reviews...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reviews.map(review => (
                    <Card key={review._id} className="shadow-md">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <Avatar className="w-12 h-12">
                                    <img
                                        src={review.userId.profileImage}
                                        alt={review.userId.name}
                                        className="rounded-full"
                                    />
                                </Avatar>
                                <div>
                                    <CardTitle className="text-lg font-semibold">
                                        {review.userId.name}
                                    </CardTitle>
                                    <p className="text-sm text-gray-500">
                                        {format(new Date(review.reviewDate), 'PPP')}
                                    </p>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-yellow-500 font-bold">Rating: {review.rating} / 5</p>
                            <p className="text-gray-700 mt-2">{review.feedback}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyReviews;
