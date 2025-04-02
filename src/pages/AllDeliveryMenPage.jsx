import { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import axiosApiCall from '@/utils/axiosApiCall';

const AllDeliveryMenPage = () => {
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalDeliveryMen, setTotalDeliveryMen] = useState(0);
    const [loading, setLoading] = useState(false); // Loading state
    const { toast } = useToast();

    // Fetch delivery men with pagination
    const fetchDeliveryMen = async (page = 1) => {
        setLoading(true); // Start loading
        try {
            const response = await axiosApiCall.get('/api/auth/delivery-men', {
                params: { page, limit: 5 },
            });
            setDeliveryMen(response.data.deliveryMen);
            setTotalDeliveryMen(response.data.totalDeliveryMen);
            console.log(response);
        } catch {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching delivery personnel.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchDeliveryMen(currentPage);
    }, [currentPage]);

    // Pagination handler
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalDeliveryMen / 5);

    return (
        <div className="mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Delivery Personnel</h2>

            {/* Show loading spinner while fetching */}
            {loading ? (
                <div className="flex justify-center my-4">
                    <p>Loading..</p>
                </div>
            ) : (
                <>
                    <Table className="text-foreground dark:text-dark-foreground w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Number of Deliveries</TableHead>
                                <TableHead>Total Earned</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deliveryMen.length > 0 ? (
                                deliveryMen.map(person => (
                                    <TableRow key={person._id}>
                                        <TableCell>{person.name}</TableCell>
                                        <TableCell>{person.phone || 'Not Provided'}</TableCell>
                                        <TableCell>{person.deliveries || '0'}</TableCell>
                                        <TableCell>${person.totalEarned || '0'}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="4" className="text-center">
                                        No delivery personnel found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>

                    {/* Pagination */}
                    <div className="flex justify-center mt-4">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        <span className="mx-2">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default AllDeliveryMenPage;
