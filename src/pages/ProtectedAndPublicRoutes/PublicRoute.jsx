// src/components/routes/PublicRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json";

const PublicRoute = ({ children }) => {

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
        return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Lottie
                className="Lottie"
                animationData={loadingAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
            />
        </div>; // Or a loading spinner
    }

    if (authStatus.isAuthenticated) {
        if (authStatus.role === "user") {
            return <Navigate to="/user" />

        } else if (authStatus.role === "admin") {
            return <Navigate to="/admin" />
        }
    } else {
        return children;
    }


};

export default PublicRoute;
