import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const KEY = sessionStorage.getItem('token');

        try {
            //const token = JSON.parse(KEY); //* POR QUÉ NO ES NEESARIO?
            if (KEY) {
                setIsAuthenticated(true);
            }
        } catch (e) {
            setIsAuthenticated(false);
            sessionStorage.removeItem('token');
        }
    }, []);

    return { isAuthenticated };
};

export { useAuth };
