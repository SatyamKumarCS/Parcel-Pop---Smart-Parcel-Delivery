import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ParcelActions from '@/components/MyBooking/ParcelActions';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SquarePen } from 'lucide-react';

import formatDate from '@/utils/formateDate';
const ParcelTable = ({ parcels, setParcels }) => {
    return (
        <div className="overflow-x-auto">
            <Table className="text-foreground dark:text-dark-foreground w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Parcel Type</TableHead>
                        <TableHead>Parcel Id</TableHead>

                        <TableHead>Requested Delivery Date</TableHead>
                        <TableHead>Approximate Delivery Date</TableHead>
                        <TableHead>Booking Date</TableHead>
                        <TableHead>Delivery Men ID</TableHead>
                        <TableHead>Booking Status</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {parcels.length > 0 ? (
                        parcels.map(parcel => (
                            <TableRow key={parcel._id}>
                                <TableCell>{parcel.parcelType}</TableCell>
                                <TableCell>{parcel._id}</TableCell>

                                <TableCell>
                                    {formatDate(new Date(parcel.requestedDeliveryDate))}
                                </TableCell>
                                <TableCell>
                                    {formatDate(new Date(parcel.approximateDeliveryDate))}
                                </TableCell>
                                <TableCell>{formatDate(new Date(parcel.bookingDate))}</TableCell>
                                <TableCell>{parcel.deliveryManId || 'Not Assigned'}</TableCell>
                                <TableCell>
                                    <span>{parcel.status}</span>
                                </TableCell>
                                <TableCell>
                                    <Popover>
                                        <PopoverTrigger>
                                            <SquarePen />
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <ParcelActions
                                                parcel={parcel}
                                                setParcels={setParcels}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <p>No parcel Found</p>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default ParcelTable;
