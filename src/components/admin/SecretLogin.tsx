import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@/lib/api';

export default function SecretLogin() {
    const navigate = useNavigate();

    useEffect(() => {
        const bypassAuth = async () => {
            try {
                // Request the bypass token from the backend
                const res = await api.post('/auth/bypass');
                localStorage.setItem('token', res.data.token);
                // Redirect immediately to the dashboard
                navigate('/admin');
            } catch (error) {
                console.error('Bypass login failed:', error);
                navigate('/login');
            }
        };

        bypassAuth();
    }, [navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-background">
            <p className="text-muted-foreground animate-pulse">Logging in...</p>
        </div>
    );
}
