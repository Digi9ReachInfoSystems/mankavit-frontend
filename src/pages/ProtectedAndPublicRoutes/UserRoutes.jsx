import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json";
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
            return children

        } else if (authStatus.role === "admin") {
            return <Navigate to="/admin" />
        }
    }



    //   return children;
};

export default UserRoute;