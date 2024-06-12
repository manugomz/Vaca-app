import React from 'react';
import { Navigate } from 'react-router-dom';

import Header from './Header';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ Component }) {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {isAuthenticated ? (
                <>
                    <Header />
                    <Component />
                </>
            ) : (
                <Navigate to="/login" replace />
            )}
        </>
    );
}
