import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import axiosApiCall from '@/utils/axiosApiCall';

const MyProfilePage = () => {
    const { user, fetchUser } = useAuth();
    const { toast } = useToast();
    const fileInputRef = useRef(null); // Reference for file input
    const [profilePicturePreview, setProfilePicturePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleProfilePictureChange = async event => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = e => setProfilePicturePreview(e.target.result);
        reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('profileImage', file);

        try {
            setIsUploading(true);
            const response = await axiosApiCall.put('/api/auth/profile-picture-update/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.success) {
                toast({
                    title: 'Success',
                    description: 'Profile picture updated successfully!',
                    variant: 'success',
                });
                fetchUser();
            } else {
                throw new Error('Failed to update profile picture');
            }
        } catch (error) {
            console.error('Error uploading profile picture:', error);
            toast({
                title: 'Error',
                description: 'An error occurred while uploading the profile picture.',
                variant: 'destructive',
            });
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click(); // Trigger the file input programmatically
    };

    return (
        <div className="p-8 max-w-3xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">My Profile</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-8">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center gap-4">
                        <Avatar className="h-28 w-28">
                            <AvatarImage
                                src={profilePicturePreview || user?.user.profileImage}
                                alt="Profile Picture"
                            />
                            <AvatarFallback>{user?.user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <Label htmlFor="profile-picture" className="sr-only">
                                Upload Profile Picture
                            </Label>
                            {/* Hidden Input */}
                            <Input
                                id="profile-picture"
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                ref={fileInputRef} // Attach ref to input
                                className="hidden"
                            />
                            {/* Button to Trigger File Picker */}
                            <Button
                                onClick={triggerFileInput} // Programmatically trigger file input
                                variant="outline"
                                className="flex items-center gap-2"
                                disabled={isUploading}
                            >
                                {isUploading ? (
                                    'Uploading...'
                                ) : (
                                    <>
                                        <Upload className="h-4 w-4" /> Upload
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Profile Info Form */}
                    <div className="w-full space-y-6">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                defaultValue={user?.user.name}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                defaultValue={user?.user.email}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                type="tel"
                                defaultValue={user?.user.phone}
                                disabled
                                className="bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Update Button */}
                    <Button
                        onClick={() =>
                            toast({
                                title: 'Update Profile',
                                description: 'Profile update logic is not implemented yet.',
                                variant: 'info',
                            })
                        }
                        variant="default"
                        className="w-full flex items-center justify-center gap-2"
                    >
                        Update Profile
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default MyProfilePage;
