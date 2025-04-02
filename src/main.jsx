import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import MainRoutes from './routes/MainRoutes';
import { Provider } from 'react-redux';
import store from './store/store';
import { Toaster } from '@/components/ui/toaster';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <MainRoutes />
                <Toaster />
            </ThemeProvider>
        </Provider>
    </StrictMode>
);
