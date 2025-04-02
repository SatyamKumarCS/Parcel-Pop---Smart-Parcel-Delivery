import { Link, useLocation } from 'react-router'; // Import Link and useLocation
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
    Package,
    BarChart,
    UserCircle,
    ClipboardList,
    Users,
    Truck,
    Star,
    Home
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import useAuth from '@/hooks/useAuth';

// Menu items.
const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
        roles: ['Admin', 'User', 'DeliveryMan'],
    },
    {
        title: 'Statistics',
        url: '/dashboard/parcelStatistics',
        icon: BarChart,
        roles: ['Admin'],
    },
    {
        title: 'My Profile',
        url: '/dashboard/myProfile',
        icon: UserCircle,
        roles: ['Admin', 'User', 'DeliveryMan'],
    },
    {
        title: 'Book Parcel',
        url: '/dashboard/book-parcel',
        icon: Package,
        roles: ['User'],
    },
    {
        title: 'My Bookings',
        url: '/dashboard/myBookigs',
        icon: ClipboardList,
        roles: ['User'],
    },
    {
        title: 'All Parcel',
        url: '/dashboard/allParcel',
        icon: BarChart,
        roles: ['Admin'],
    },
    {
        title: 'All Users',
        url: '/dashboard/allUsers',
        icon: Users,
        roles: ['Admin'],
    },
    {
        title: 'My Deliveries',
        url: '/dashboard/myDelivery',
        icon: Truck,
        roles: ['DeliveryMan'],
    },
    {
        title: 'My Reviews',
        url: '/dashboard/myReviews',
        icon: Star,
        roles: ['DeliveryMan'],
    },
    {
        title: 'All Delivery Man',
        url: '/dashboard/allDeliveryMen',
        icon: Truck,
        roles: ['Admin'],
    },
];

export default function DashboardSideBar() {
    const location = useLocation(); // Get current location
    const { user } = useAuth();
    const userRole = user?.user.role || 'User'; // Default role is User if none is provided

    // Filter menu items based on user's role
    const filteredItems = items.filter(item => item.roles.includes(userRole));

    return (
        <Sidebar className="">
            <SidebarContent className="bg-sidebar dark:bg-dark-sidebar">
                <SidebarGroup>
                    <SidebarGroupLabel className="!py-7 border border-border dark:border-dark-border mb-2">
                        <div className="flex gap-3 items-center">
                            <Avatar>
                                <AvatarImage src={user?.user.profileImage} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <h5>{user?.user.name}</h5>
                                <span>{user?.user.role}</span>
                            </div>
                        </div>
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {filteredItems.map(item => (
                                <SidebarMenuItem
                                    key={item.title}
                                    className={`${location.pathname === item.url ? 'active' : ''}`}
                                >
                                    <SidebarMenuButton asChild>
                                        <Link
                                            to={item.url}
                                            className={`${
                                                location.pathname === item.url
                                                    ? 'font-semibold bg-muted dark:bg-dark-muted'
                                                    : ''
                                            }`}
                                        >
                                            <item.icon
                                                className={`text-sidebar-foreground dark:text-dark-sidebar-foreground ${
                                                    location.pathname === item.url
                                                        ? '!text-foreground dark:!text-dark-foreground'
                                                        : ''
                                                }`}
                                            />
                                            <span
                                                className={`${
                                                    location.pathname === item.url
                                                        ? 'font-semibold !text-foreground dark:!text-dark-foreground'
                                                        : ''
                                                }`}
                                            >
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
