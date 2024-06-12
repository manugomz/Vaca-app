import React, { useState } from 'react';

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
                <div>please log in</div> //* HOW TO REDIRET HERE
            )}
        </>
    );
}
