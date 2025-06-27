import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';

const UserRoute = ({ children, }) => {
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        role: null,
        isLoading: true
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { isAuthenticated, role } = await getAuth();
                setAuthStatus({
                    isAuthenticated,
                    role,
                    isLoading: false
                });
            } catch (error) {
                setAuthStatus({
                    isAuthenticated: false,
                    role: null,
                    isLoading: false
                });
            }
        };

        checkAuth();
    }, []);

    if (authStatus.isLoading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!authStatus.isAuthenticated) {
       return children;
    }
    if (authStatus.isAuthenticated) {

        if (authStatus.role === "user") {
            return children

        } else if (authStatus.role === "admin") {
            return <Navigate to="/admin" />
        }
    }

   

    //   return children;
};

export default UserRoute;