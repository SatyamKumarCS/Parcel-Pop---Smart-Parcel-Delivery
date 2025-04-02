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

const AllUsersPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const { toast } = useToast();

    // Fetch users with pagination
    const fetchUsers = async (page = 1) => {
        try {
            const response = await axiosApiCall.get('/api/users', {
                params: { page, limit: 5 },
            });
            setUsers(response.data.data);
            setTotalUsers(response.data.total);
        } catch {
            toast({
                title: 'Error',
                description: 'An error occurred while fetching users.',
                variant: 'destructive',
            });
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
    }, [currentPage]);

    // Update user role (Admin or DeliveryMan)
    const updateUserRole = async (userId, role) => {
        try {
            const response = await axiosApiCall.patch('/api/auth/update-role', {
                _id: userId,
                role,
            });
            if (response.status === 200) {
                toast({
                    title: 'Success',
                    description: `User role updated to ${role}.`,
                });
                fetchUsers(currentPage); // Re-fetch users after role change
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to update user role.',
                variant: 'destructive',
            });
        }
    };

    // Pagination handler
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(totalUsers / 5);

    return (
        <div className="mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Users</h2>

            <Table className="text-foreground dark:text-dark-foreground w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>User Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Number of Parcels</TableHead>
                        <TableHead>Total Spent</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <TableRow key={user._id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.phone || 'Not Provided'}</TableCell>
                                <TableCell>{user.parcelsBooked.length}</TableCell>
                                <TableCell>${user.totalSpent || '0'}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button
                                            onClick={() => updateUserRole(user._id, 'DeliveryMan')}
                                        >
                                            Make Delivery Man
                                        </Button>
                                        <Button onClick={() => updateUserRole(user._id, 'Admin')}>
                                            Make Admin
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan="5" className="text-center">
                                No users found.
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
        </div>
    );
};

export default AllUsersPage;
