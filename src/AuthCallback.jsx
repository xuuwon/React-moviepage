import { useEffect } from 'react';
import { useAuth } from './AuthContext';

const AuthCallback = () => {
    const { handleAuthCallback } = useAuth();

    useEffect(() => { 
        handleAuthCallback();
    }, []);

    return <></>;
};

export default AuthCallback;
