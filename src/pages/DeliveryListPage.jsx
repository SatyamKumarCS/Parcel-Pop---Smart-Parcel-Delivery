import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import axiosApiCall from '@/utils/axiosApiCall';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
// import Map, { Marker } from 'react-map-gl';
import formatDate from '@/utils/formateDate';
// Import Mapbox and React MapGL
import ReactMapGL, { Marker } from 'react-map-gl';

const DeliveryListPage = () => {
    const [parcels, setParcels] = useState([]);
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState({
        isVisible: false,
        parcelId: null,
        status: '',
    });

    // State for Map and Modal
    const [mapState, setMapState] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 14,
    });

    const [isMapModalOpen, setIsMapModalOpen] = useState(false);

    // Fetch parcels assigned to the logged-in delivery man
    const fetchParcels = async () => {
        try {
            setLoading(true);
            const response = await axiosApiCall('/api/parcel/parcelForDeliveryMan');
            setParcels(response.data.data);
        } catch (error) {
            console.error('Error fetching parcels:', error);
            toast({
                title: 'Error',
                description: 'Failed to load parcels.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchParcels();
    }, []);

    // Handle parcel status update
    const updateParcelStatus = async (id, status) => {
        try {
            const response = await axiosApiCall.patch(`/api/parcel/${id}/status`, { status });
            console.log(response);

            toast({
                title: `Booking ${status}`,
                description: `The parcel status has been updated to ${status}.`,
            });
            fetchParcels(); // Refresh list
        } catch (error) {
            console.error(`Error updating status to ${status}:`, error);
            toast({
                title: 'Error',
                description: `Failed to update parcel status.`,
                variant: 'destructive',
            });
        }
    };

    const openConfirmationDialog = (parcelId, status) => {
        setConfirmationDialog({ isVisible: true, parcelId, status });
    };

    const closeConfirmationDialog = () => {
        setConfirmationDialog({ isVisible: false, parcelId: null, status: '' });
    };

    const handleConfirmStatusUpdate = () => {
        updateParcelStatus(confirmationDialog.parcelId, confirmationDialog.status);
        closeConfirmationDialog();
    };

    const openMapModal = (latitude, longitude) => {
        setMapState({
            latitude: latitude,
            longitude: longitude,
            zoom: 14,
        });
        setIsMapModalOpen(true);
    };

    const closeMapModal = () => {
        setIsMapModalOpen(false);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="container mx-auto my-8">
            <h2 className="text-xl font-semibold mb-4">My Delivery List</h2>
            <Table className="text-foreground dark:text-dark-foreground">
                <TableHeader>
                    <TableRow>
                        <TableHead>Booked User Name</TableHead>
                        <TableHead>Receiver Name</TableHead>
                        <TableHead>Booked User Phone</TableHead>
                        <TableHead>Requested Delivery Date</TableHead>
                        <TableHead>Approx. Delivery Date</TableHead>
                        <TableHead>Receiver Phone</TableHead>
                        <TableHead>Receiver Address</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parcels?.map(parcel => (
                        <TableRow key={parcel._id}>
                            <TableCell>{parcel.userName}</TableCell>
                            <TableCell>{parcel.receiverName}</TableCell>
                            <TableCell>{parcel.userPhone}</TableCell>
                            <TableCell>{formatDate(parcel.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(parcel.approximateDeliveryDate)}</TableCell>
                            <TableCell>{parcel.receiverPhone}</TableCell>
                            <TableCell>{parcel.deliveryAddress}</TableCell>
                            <TableCell className="flex gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="secondary">Actions</Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="end">
                                        <div className="flex flex-col gap-2">
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    openConfirmationDialog(parcel._id, 'Cancelled')
                                                }
                                                disabled={
                                                    parcel.status === 'Delivered' ||
                                                    parcel.status === 'Cancelled'
                                                }
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    openConfirmationDialog(parcel._id, 'Delivered')
                                                }
                                                disabled={
                                                    parcel.status === 'Delivered' ||
                                                    parcel.status === 'Cancelled'
                                                }
                                            >
                                                Deliver
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    openMapModal(
                                                        parcel.deliveryLat,
                                                        parcel.deliveryLng
                                                    )
                                                }
                                            >
                                                See Location
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={confirmationDialog.isVisible} onOpenChange={closeConfirmationDialog}>
                <DialogContent>
                    <h3 className="text-lg font-medium">Confirm Status Update</h3>
                    <p>
                        Are you sure you want to update the status to{' '}
                        <strong>{confirmationDialog.status}</strong>?
                    </p>
                    <DialogFooter className="flex justify-end gap-4">
                        <Button variant="outline" onClick={closeConfirmationDialog}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleConfirmStatusUpdate}>
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Map Modal */}
            {isMapModalOpen && (
                <Dialog open={isMapModalOpen} onOpenChange={closeMapModal}>
                    <DialogContent>
                        <h3 className="text-lg font-medium">Parcel Location</h3>
                        <div className="w-full h-[300px] overflow-hidden rounded-lg">
                            <ReactMapGL
                                mapboxAccessToken={import.meta.env.VITE_MAP_BOX_ACCESS_TOKEN}
                                initialViewState={{
                                    longitude: mapState.longitude,
                                    latitude: mapState.latitude,
                                    zoom: 14,
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v9"
                                style={{ width: '100%', height: 400 }}
                            >
                                <Marker
                                    latitude={mapState?.latitude}
                                    longitude={mapState?.longitude}
                                    anchor="bottom"
                                    className="absolute top-0"
                                >
                                    📍
                                </Marker>
                            </ReactMapGL>
                        </div>
                        <DialogFooter className="flex justify-end gap-4">
                            <Button variant="outline" onClick={closeMapModal}>
                                Close
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default DeliveryListPage;
