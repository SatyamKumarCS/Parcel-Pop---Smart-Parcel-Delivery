import { LocateFixed } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function TrackParcel() {
    const [onFocus, setOnFocus] = useState(false);
    const [trackingId, setTrackingId] = useState('');
    const navigate = useNavigate();

    return (
        <div className="bg-card dark:bg-dark-card p-3 rounded-lg border border-border dark:border-dark-border bg-opacity-50 dark:bg-opacity-50 backdrop-blur-sm">
            <h4 className="mb-2">Track your parcel:</h4>
            <div
                className={`flex border rounded-lg overflow-hidden bg-card dark:bg-dark-card ${
                    onFocus ? 'border-secondary' : 'border-border dark:border-dark-border'
                }`}
            >
                <Button className="bg-transparent hover:bg-transparent cursor-default border-r rounded-none border-border dark:border-dark-border text-foreground dark:text-dark-foreground">
                    <LocateFixed />
                </Button>
                <Input
                    placeholder="Enter the tracking ID"
                    className={
                        'focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-offset-0 rounded-none !bg-transparent border-none !border-l-2 border-border'
                    }
                    onFocus={() => {
                        setOnFocus(prev => !prev);
                    }}
                    onBlur={() => {
                        setOnFocus(prev => !prev);
                    }}
                    value={trackingId}
                    onChange={e => setTrackingId(e.target.value)}
                />
                <Button
                    variant="outline"
                    className="bg-accent bg-opacity-50 !border-0 !border-accent !ring-0 rounded-none rounded-r-lg"
                    onClick={() => navigate(`/track/${trackingId}`)}
                >
                    Track
                </Button>
            </div>
        </div>
    );
}
