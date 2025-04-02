import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useCallback } from 'react';
import { fetchUserData, logout } from '@/features/userSlice';

const useAuth = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.auth); // Match the store's reducer key

    // Fetch user data on mount if not already fetched
    useEffect(() => {
        if (!user && !loading && !error) {
            dispatch(fetchUserData());
        }
    }, [dispatch, user, loading, error]);

    // Logout function to clear user data and token
    const logOut = useCallback(() => {
        dispatch(logout()); // Dispatch Redux action to reset auth state
    }, [dispatch]);

    // Fetch user data manually
    const fetchUser = useCallback(() => {
        dispatch(fetchUserData());
    }, [dispatch]);

    return { user, loading, error, logOut, fetchUser };
};

export default useAuth;
