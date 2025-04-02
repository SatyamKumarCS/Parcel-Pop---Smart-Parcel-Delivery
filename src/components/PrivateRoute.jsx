import { Navigate } from 'react-router'; // Correct import for Navigate
import { useEffect, useState } from 'react';
import useAuth from '@/hooks/useAuth';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [authChecked, setAuthChecked] = useState(false);

    // Wait for loading to finish before making decisions
    useEffect(() => {
        if (!loading) {
            setAuthChecked(true);
        }
    }, [loading]);

    // Show a loading state until authentication is fully checked
    if (!authChecked || loading) {
        return (
            <section className="flex justify-center items-center min-h-screen bg-background dark:bg-dark-background">
                <h1 className="text-4xl">Loading...</h1>
            </section>
        );
    }

    // Render children if the user is authenticated, otherwise redirect
    return user ? children : <Navigate to="/signin-signup" replace />;
};

export default PrivateRoute;
