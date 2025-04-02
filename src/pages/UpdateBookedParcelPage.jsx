import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import useAuth from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import axiosApiCall from '@/utils/axiosApiCall';
import { useNavigate, useParams } from 'react-router';

// Validation schema for the form
const formSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 characters long' }),
    parcelType: z.string().nonempty({ message: 'Parcel type is required' }),
    parcelWeight: z.preprocess(
        value => parseFloat(value), // Convert string to number
        z
            .number()
            .positive({ message: 'Parcel weight must be positive' })
            .min(1, { message: 'Parcel weight must be at least 1kg' })
    ),
    receiverName: z.string().nonempty({ message: "Receiver's name is required" }),
    receiverPhone: z
        .string()
        .min(10, { message: 'Phone number must be at least 10 characters long' }),
    deliveryAddress: z.string().nonempty({ message: 'Delivery address is required' }),
    deliveryDate: z.date({ required_error: 'Delivery date is required' }),
    deliveryLatitude: z
        .number({ message: 'Latitude must be a valid number' })
        .refine(value => !isNaN(value), 'Latitude must be a valid decimal number'),
    deliveryLongitude: z
        .number({ message: 'Longitude must be a valid number' })
        .refine(value => !isNaN(value), 'Longitude must be a valid decimal number'),
});

export default function UpdateBookedParcelPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const [parcelData, setParcelData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchParcelData = async () => {
            try {
                const response = await axiosApiCall.get(`/api/parcel/parcelById/${id}`);
                setParcelData(response.data);
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

        if (id) fetchParcelData();
    }, [id, toast]);

    const calculatePrice = weight => {
        if (weight <= 1) return 50;
        if (weight <= 2) return 100;
        return 150;
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: '',
            parcelType: '',
            parcelWeight: '',
            receiverName: '',
            receiverPhone: '',
            deliveryAddress: '',
            deliveryDate: null,
            deliveryLatitude: 0, // Set default to 0
            deliveryLongitude: 0, // Set default to 0
        },
    });

    // Set initial parcel data and price after form is initialized
    useEffect(() => {
        if (parcelData) {
            // Reset form with fetched data
            form.reset({
                phoneNumber: parcelData.data.userPhone || '',
                parcelType: parcelData.data.parcelType || '',
                parcelWeight: parcelData.data.parcelWeight || '',
                receiverName: parcelData.data.receiverName || '',
                receiverPhone: parcelData.data.receiverPhone || '',
                deliveryAddress: parcelData.data.deliveryAddress || '',
                deliveryDate: parcelData.data.requestedDeliveryDate
                    ? new Date(parcelData.data.requestedDeliveryDate)
                    : null,
                deliveryLatitude: parcelData.data.deliveryLat || 0,
                deliveryLongitude: parcelData.data.deliveryLng || 0,
            });

            setPrice(calculatePrice(parcelData.parcelWeight));
        }
    }, [parcelData, form]);

    // Watch parcelWeight field and update price
    useEffect(() => {
        const weight = parseFloat(form.watch('parcelWeight')) || 0;
        if (weight > 0) {
            setPrice(calculatePrice(weight));
        } else {
            setPrice(0);
        }
    }, [form.watch('parcelWeight')]);

    const onSubmit = async formData => {
        setLoading(true);
        try {
            const payload = {
                parcelId: id,
                userId: user?.user?._id,
                userName: user?.user?.name,
                userEmail: user?.user?.email,
                userPhone: formData.phoneNumber,
                parcelType: formData.parcelType,
                parcelWeight: parseFloat(formData.parcelWeight),
                receiverName: formData.receiverName,
                receiverPhone: formData.receiverPhone,
                deliveryAddress: formData.deliveryAddress,
                deliveryLat: formData.deliveryLatitude,
                deliveryLng: formData.deliveryLongitude,
                price,
                requestedDeliveryDate: formData.deliveryDate,
                approximateDeliveryDate: calculateApproximateDeliveryDate(formData.deliveryDate),
            };

            await axiosApiCall.put(`/api/parcel/updateParcel/${id}`, payload);

            form.reset();
            setPrice(0);
            toast({
                title: 'Parcel Updated',
                description: 'Your parcel information has been successfully updated.',
            });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating form:', error);
            toast({
                title: 'Error',
                description: 'Failed to update the parcel. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const calculateApproximateDeliveryDate = deliveryDate => {
        const date = new Date(deliveryDate);
        date.setDate(date.getDate() + 2); // Add 2 days
        return date;
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading parcel data</div>;

    return (
        <div className="p-4 mobile-lg:p-2 max-w-[700px] w-full mx-auto">
            <h1 className=" mb-4">Update Parcel Booking</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Same form fields as the BookParcelPage, but populated with existing data */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={() => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        value={user?.user.name || ''}
                                        readOnly
                                        className="bg-gray-100 cursor-not-allowed"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={() => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        value={user?.user.email || ''}
                                        readOnly
                                        className="bg-gray-100 cursor-not-allowed"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    {[
                        {
                            name: 'phoneNumber',
                            label: 'Phone Number',
                            placeholder: 'Enter phone number',
                        },
                        {
                            name: 'parcelType',
                            label: 'Parcel Type',
                            placeholder: 'Enter parcel type',
                        },
                        {
                            name: 'parcelWeight',
                            label: 'Parcel Weight (kg)',
                            placeholder: 'Enter parcel weight',
                            type: 'number',
                        },
                        {
                            name: 'receiverName',
                            label: "Receiver's Name",
                            placeholder: "Enter receiver's name",
                        },
                        {
                            name: 'receiverPhone',
                            label: "Receiver's Phone Number",
                            placeholder: "Enter receiver's phone number",
                        },
                        {
                            name: 'deliveryAddress',
                            label: 'Delivery Address',
                            placeholder: 'Enter delivery address',
                        },
                        {
                            name: 'deliveryLatitude',
                            label: 'Delivery Address Latitude',
                            placeholder: 'Enter latitude',
                            type: 'number',
                        },
                        {
                            name: 'deliveryLongitude',
                            label: 'Delivery Address Longitude',
                            placeholder: 'Enter longitude',
                            type: 'number',
                        },
                    ].map(({ name, label, placeholder, type = 'text' }) => (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{label}</FormLabel>
                                    <FormControl>
                                        <Input {...field} type={type} placeholder={placeholder} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    {/* Delivery Date (Date Picker) */}
                    <FormField
                        control={form.control}
                        name="deliveryDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Requested Delivery Date</FormLabel>
                                <FormControl>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="w-full justify-start text-left font-normal text-foreground dark:text-dark-foreground border border-border dark:border-dark-border hover:bg-background hover:dark:bg-dark-background hover:text-foreground dark:hover:text-dark-foreground"
                                            >
                                                {field.value
                                                    ? field.value.toLocaleDateString()
                                                    : 'Select a date'}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                initialFocus
                                                className={
                                                    'bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground '
                                                }
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Price Field (Read-only) */}
                    <FormItem>
                        <FormLabel>Price (Tk)</FormLabel>
                        <FormControl>
                            <Input
                                type="text"
                                value={price || ''}
                                readOnly
                                className="bg-gray-100 cursor-not-allowed"
                            />
                        </FormControl>
                    </FormItem>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Parcel'}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
