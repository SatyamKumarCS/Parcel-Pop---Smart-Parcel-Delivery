import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import axiosApiCall from '@/utils/axiosApiCall';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth';
import { Label } from '@radix-ui/react-dropdown-menu';

const ReviewDialog = ({ parcel }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [reviewData, setReviewData] = useState({ rating: '', feedback: '' });
    const { toast } = useToast();
    const { user } = useAuth();

    const handleSubmitReview = async () => {
        try {
            const { rating, feedback } = reviewData;
            const review = {
                rating,
                feedback,
                parcelId: parcel._id,
                deliveryManId: parcel.deliveryManId,
            };

            const response = await axiosApiCall.post(`/api/parcel/reviews`, review);
            console.log(response);

            if (response.status === 201) {
                toast({ title: 'Review Added', description: 'Successfully submitted review.' });
                setOpenDialog(false);
                setReviewData({ rating: '', feedback: '' });
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to submit review.',
                variant: 'destructive',
            });
        }
    };

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button onClick={() => setOpenDialog(true)}>Leave a Review</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-foreground dark:text-dark-foreground">
                        Submit a Review
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-foreground dark:text-dark-foreground">
                    <div className="flex gap-2 items-center">
                        <Avatar className="rounded-lg w-20 h-20">
                            <AvatarImage src={user?.user.profileImage} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="w-full">
                            <Label>Name</Label>
                            <Input
                                value={user?.user.name}
                                readOnly
                                className="cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div>
                        <Label>Delivery Man ID</Label>
                        <Input
                            value={parcel?.deliveryManId}
                            readOnly
                            className="cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <Label>Enter review out of 5</Label>
                        <Input
                            value={reviewData.rating}
                            type="number"
                            onChange={e => setReviewData({ ...reviewData, rating: e.target.value })}
                        />
                    </div>
                    <div>
                        <Label>Feedback</Label>
                        <Textarea
                            value={reviewData.feedback}
                            onChange={e =>
                                setReviewData({ ...reviewData, feedback: e.target.value })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        onClick={handleSubmitReview}
                        disabled={!reviewData.rating || !reviewData.feedback}
                    >
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ReviewDialog;
