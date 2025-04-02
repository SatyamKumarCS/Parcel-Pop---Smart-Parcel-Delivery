import axios from 'axios';

// Create an Axios instance with a base URL
const axiosApiCall = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1200', // Use Vite's environment variable
    headers: {
        'Content-Type': 'application/json', // Default content type
    },
});

// Request interceptor to add the access token to headers
axiosApiCall.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token expiry and refresh
let isRefreshing = false;
let refreshSubscribers = [];

const onRefreshed = accessToken => {
    refreshSubscribers.forEach(callback => callback(accessToken));
    refreshSubscribers = [];
};

const addRefreshSubscriber = callback => {
    refreshSubscribers.push(callback);
};

axiosApiCall.interceptors.response.use(
    response => response, // Handle successful responses
    async error => {
        const originalRequest = error.config;

        if (!error.response) {
            return Promise.reject(error);
        }

        // Handle token expiration (401/403)
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log('Token expired or unauthorized, refreshing token...');

            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                localStorage.clear();
                return Promise.reject(error);
            }

            // Prevent multiple refresh requests
            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const { data } = await axios.post(
                        `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh-token`,
                        { refreshToken }
                    );
                    console.log('Refresh token response:', data);
                    localStorage.setItem('accessToken', data.accessToken); // Update the access token
                    isRefreshing = false;
                    onRefreshed(data.accessToken);
                } catch (refreshError) {
                    isRefreshing = false;
                    console.error('Error during token refresh:', refreshError);
                    localStorage.clear();
                    return Promise.reject(refreshError);
                }
            }

            return new Promise(resolve => {
                addRefreshSubscriber(newAccessToken => {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    resolve(axiosApiCall(originalRequest)); // Retry original request with new access token
                });
            });
        }

        return Promise.reject(error);
    }
);

export default axiosApiCall;
