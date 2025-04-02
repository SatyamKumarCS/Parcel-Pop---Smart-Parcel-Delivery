import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router';

export default function HeaderProfile() {
    const { user, logOut } = useAuth();

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="cursor-pointer">
                    <Avatar>
                        <AvatarImage src={user.user.profileImage} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>{user?.user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link to={'/dashboard/myProfile'}>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            to={
                                user.user.role === 'Admin'
                                    ? '/dashboard/parcelStatistics'
                                    : '/dashboard/myProfile'
                            }
                        >
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="bg-destructive dark:bg-dark-destructive text-destructive-foreground dark:text-dark-destructive-foreground"
                        onClick={() => {
                            logOut();
                        }}
                    >
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
