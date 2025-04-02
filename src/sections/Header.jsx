import { ModeToggle } from '@/components/ModeToggle';
import Section from '@/components/Section';
import NavLinks from '../components/NavLinks';
import { Link } from 'react-router';
import HeaderProfile from '@/components/HeaderProfile';
import useAuth from '@/hooks/useAuth';
import { LoaderCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
    const { user, loading } = useAuth();

    return (
        <Section
            className={
                'bg-background dark:bg-dark-background sticky top-0 z-50 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg border-b border-border dark:border-dark-border py-3'
            }
        >
            <div className="flex justify-between">
                <div className="basis-1/6 flex justify-start items-center">
                    <Link to={'/'}>
                        <img className="h-10" src="/logos/logo.svg" alt="" />
                    </Link>
                </div>
                <div className="basis-4/6 flex justify-center items-center">
                    <NavLinks />
                </div>
                <div className="basis-1/6 flex justify-end items-center">
                    <div className="flex gap-2 items-center justify-center">
                        {/* <NotificationButton /> */}
                        {loading ? (
                            <LoaderCircle className="animate-spin" />
                        ) : user ? (
                            <HeaderProfile />
                        ) : (
                            <Link to={'/signin-signup'}>
                                <Button>Log in</Button>
                            </Link>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </Section>
    );
}

// function NotificationButton() {
//     return (
//         <button
//             className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
//             aria-label="Notifications"
//         >
//             <Bell className="w-6 h-6" />
//             {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
//                 3
//             </span> */}
//         </button>
//     );
// }
