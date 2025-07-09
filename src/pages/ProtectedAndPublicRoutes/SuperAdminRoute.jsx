import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json";
const SuperAdminRoute = ({ children, }) => {
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        role: null,
        isLoading: true,
        isSuperAdmin: false,
        Permissions: {}
    });

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { isAuthenticated, role, isSuperAdmin, Permissions } = await getAuth();
                setAuthStatus({
                    isAuthenticated,
                    role,
                    isLoading: false,
                    isSuperAdmin: isSuperAdmin,
                    Permissions: Permissions
                });
            } catch (error) {
                setAuthStatus({
                    isAuthenticated: false,
                    role: null,
                    isLoading: false,
                    isSuperAdmin: false,
                    Permissions: null
                });
            }
        };

        checkAuth();
    }, []);

    if (authStatus.isLoading) {
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Lottie
                className="Lottie"
                animationData={loadingAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>;
    }

    if (!authStatus.isAuthenticated) {
        return children;
    }
    if (authStatus.isAuthenticated) {

        if (authStatus.role === "user") {
            return <Navigate to="/user" />


        } else if (authStatus.role === "admin") {
            if (authStatus.isSuperAdmin === true) {
                return children
            } else {
                return <Navigate to="/admin" />
            }
        }
    }



    //   return children;
};

export default SuperAdminRoute;