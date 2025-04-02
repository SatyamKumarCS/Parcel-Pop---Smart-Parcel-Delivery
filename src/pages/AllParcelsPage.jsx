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
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import axiosApiCall from '@/utils/axiosApiCall';
import formatDate from '@/utils/formateDate';
const AllParcelsPage = () => {
    const [parcels, setParcels] = useState([]);
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [assignData, setAssignData] = useState({ deliveryManId: '', deliveryDate: '' });
    const [filters, setFilters] = useState({ dateFrom: '', dateTo: '' });
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Fetch all parcels
    useEffect(() => {
        const fetchParcels = async () => {
            try {
                setLoading(true);
                const response = await axiosApiCall.get('/api/parcel/all-parcel');
                setParcels(response.data.data);
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to fetch parcels.',
                    variant: 'destructive',
                });
            } finally {
                setLoading(false);
            }
        };
        fetchParcels();
    }, []);

    // Fetch all delivery men
    useEffect(() => {
        const fetchDeliveryMen = async () => {
            try {
                const response = await axiosApiCall.get('/api/auth/delivery-men');
                setDeliveryMen(response.data.deliveryMen);
            } catch {
                toast({
                    title: 'Error',
                    description: 'Failed to fetch deliverymen.',
                    variant: 'destructive',
                });
            }
        };
        fetchDeliveryMen();
    }, []);

    // Filter parcels based on date range
    const handleSearch = async () => {
        try {
            const response = await axiosApiCall.get('/api/parcel/filterByDate', {
                params: { dateFrom: filters.dateFrom, dateTo: filters.dateTo },
            });
            setParcels(response.data);
            console.log(response.data);
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to filter parcels.',
                variant: 'destructive',
            });
        }
    };

    // Assign deliveryman and update parcel
    const handleAssign = async () => {
        try {
            if (!assignData.deliveryManId || !assignData.deliveryDate) {
                toast({
                    title: 'Error',
                    description: 'Please fill all fields.',
                    variant: 'destructive',
                });
                return;
            }
            const response = await axiosApiCall.patch(`/api/parcel/assign/${selectedParcel._id}`, {
                deliveryManId: assignData.deliveryManId,
                deliveryDate: assignData.deliveryDate,
            });

            if (response.status === 200) {
                setParcels(prevParcels =>
                    prevParcels.map(parcel =>
                        parcel._id === selectedParcel._id
                            ? {
                                  ...parcel,
                                  status: 'On The Way',
                                  deliveryManId: assignData.deliveryManId,
                              }
                            : parcel
                    )
                );
                toast({
                    title: 'Success',
                    description: 'Parcel updated successfully.',
                });
                setSelectedParcel(null);
            } else {
                throw new Error('Failed to update parcel.');
            }
        } catch {
            toast({
                title: 'Error',
                description: 'Failed to assign deliveryman.',
                variant: 'destructive',
            });
        }
    };

    if (!parcels || !deliveryMen) {
        return <p>Loading</p>;
    }

    return (
        <div className="mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">All Parcels</h2>

            {/* Search System */}
            <div className="flex gap-4 mb-6">
                <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={e => setFilters({ ...filters, dateFrom: e.target.value })}
                    placeholder="Date From"
                />
                <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={e => setFilters({ ...filters, dateTo: e.target.value })}
                    placeholder="Date To"
                />
                <Button onClick={handleSearch}>Search</Button>
            </div>

            {/* Loading State */}
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table className="text-foreground dark:text-dark-foreground w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>User Name</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Booking Date</TableHead>
                            <TableHead>Requested Delivery Date</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Manage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {parcels.length > 0 ? (
                            parcels.map(parcel => (
                                <TableRow key={parcel._id}>
                                    <TableCell>{parcel.userName}</TableCell>
                                    <TableCell>{parcel.userPhone}</TableCell>
                                    <TableCell>{formatDate(parcel.bookingDate)}</TableCell>{' '}
                                    {/* Format booking date */}
                                    <TableCell>
                                        {formatDate(parcel.requestedDeliveryDate)}
                                    </TableCell>{' '}
                                    {/* Format requested delivery date */}
                                    <TableCell>${parcel.price}</TableCell>
                                    <TableCell>{parcel.status}</TableCell>
                                    <TableCell>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button onClick={() => setSelectedParcel(parcel)}>
                                                    Manage
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Manage Parcel</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4">
                                                    <Select
                                                        onValueChange={value =>
                                                            setAssignData({
                                                                ...assignData,
                                                                deliveryManId: value,
                                                            })
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <span>Select Deliveryman</span>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {deliveryMen.map(man => (
                                                                <SelectItem
                                                                    key={man._id}
                                                                    value={man._id}
                                                                >
                                                                    {man.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Input
                                                        type="date"
                                                        value={assignData.deliveryDate}
                                                        onChange={e =>
                                                            setAssignData({
                                                                ...assignData,
                                                                deliveryDate: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleAssign}>Assign</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan="7" className="text-center">
                                    No parcels found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default AllParcelsPage;
