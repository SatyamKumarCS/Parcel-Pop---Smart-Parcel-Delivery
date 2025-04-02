import { useState } from 'react';
import LogInResgisterFormHeader from './micro/LogInResgisterFormHeader';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import axiosApiCall from '@/utils/axiosApiCall';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';

// Validation schema using Zod
const formSchema = z
    .object({
        name: z.string().min(2, { message: 'Name must be at least 2 characters long' }),
        email: z.string().email({ message: 'Invalid email address' }),
        password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
        confirmPassword: z.string(),
        acceptTerms: z.literal(true, { message: 'You must accept the terms and conditions' }),
        role: z.enum(['User', 'DeliveryMan'], { message: 'Please select a role' }),
        profileImage: z
            .instanceof(File)
            .optional()
            .refine(file => !file || file.size <= 5 * 1024 * 1024, {
                message: 'File size should be less than 5MB',
            }),
    })
    .refine(data => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: 'Passwords do not match',
    });

export default function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            acceptTerms: false,
            role: '',
            profileImage: null, // Default for profile picture
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { toast } = useToast(); // For showing toast notifications
    const { fetchUser } = useAuth();
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const onSubmit = async data => {
        setLoading(true); // Start loading state
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('role', data.role);
            formData.append('acceptTerms', data.acceptTerms);

            if (data.profileImage) {
                formData.append('profileImage', data.profileImage);
            }

            const response = await axiosApiCall.post('/api/auth/register', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            console.log('Response:', response.data);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            form.reset(); // Clear the form
            fetchUser();
            // Show success toast
            toast({
                title: 'Registration Successful',
                description: 'Welcome aboard!',
            });
        } catch (error) {
            console.error('Error during registration:', error.response?.data || error.message);

            // Show error toast
            toast({
                title: 'Registration Failed',
                description: error.response?.data?.message || error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false); // End loading state
        }
    };

    return (
        <div className="p-4">
            <LogInResgisterFormHeader heading={'Register'} />
            <div className="px-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name Field */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                className="absolute top-0 right-0 bg-transparent hover:bg-transparent"
                                                onClick={togglePasswordVisibility}
                                            >
                                                {showPassword ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password Field */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="Confirm Password"
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                className="absolute top-0 right-0 bg-transparent hover:bg-transparent"
                                                onClick={toggleConfirmPasswordVisibility}
                                            >
                                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Role Selection Field */}
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Register as</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Role" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="User">User</SelectItem>
                                                    <SelectItem value="DeliveryMan">
                                                        Delivery Man
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Profile Picture Upload */}
                            <FormField
                                control={form.control}
                                name="profileImage"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Profile Picture</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={e => field.onChange(e.target.files[0])}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Accept Terms Checkbox */}
                        <FormField
                            control={form.control}
                            name="acceptTerms"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="acceptTerms"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <FormLabel htmlFor="acceptTerms" className="text-sm">
                                            I accept the terms and conditions
                                        </FormLabel>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <LoaderCircle className="animate-spin" /> : 'Register'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
