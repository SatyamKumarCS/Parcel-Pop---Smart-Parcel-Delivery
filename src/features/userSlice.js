import axiosApiCall from '@/utils/axiosApiCall';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async (_, { rejectWithValue }) => {
        try {
            const accessToken = localStorage.getItem('accessToken');

            if (!accessToken) throw new Error('No token found');

            const decodedToken = jwtDecode(accessToken); // Decode the token to get the ID or other information
            const userId = decodedToken._id; // Assuming the token contains user ID

            // Fetch user data from backend using the decoded user ID
            const response = await axiosApiCall.get(`api/auth/privateUserData/${userId}`);
            return response.data; // Assuming the response contains user data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: state => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchUserData.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload; // Assuming the payload contains user data
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.loading = false;
                state.user = null;
                state.error = action.payload || 'Failed to fetch user data';
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
