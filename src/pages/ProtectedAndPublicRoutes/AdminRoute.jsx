import React, { useEffect, useState, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json";
const CHECK_INTERVAL_MS = 60_000;
const AdminRoute = ({ children, Access }) => {
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        role: null,
        isLoading: true,
        isSuperAdmin: false,
        Permissions: {}
    });
    const navigate = useNavigate();
    const intervalRef = useRef(null);

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

    // useEffect(() => {

    //     if (authStatus.isLoading || !authStatus.isAuthenticated) return;

    //     const tick = async () => {
    //         try {
    //             const { isAuthenticated, role } = await getAuth();
    //             setAuthStatus({
    //                 isAuthenticated,
    //                 role,
    //                 isLoading: false
    //             });        // optional if refresh does a verify
    //         } catch (err) {
    //             try { await logout(); } catch { }
    //             setAuthStatus({ isAuthenticated: false, role: null, isLoading: false });
    //             navigate("/", { replace: true });
    //         }
    //     };
    //     const onVisibility = () => {
    //         if (document.visibilityState === "visible") tick();
    //     };
    //     document.addEventListener("visibilitychange", onVisibility);

    //     tick();
    //     intervalRef.current = setInterval(() => {
    //         if (document.visibilityState === "visible" && navigator.onLine) tick();
    //     }, CHECK_INTERVAL_MS);

    //     return () => {
    //         document.removeEventListener("visibilitychange", onVisibility);
    //         if (intervalRef.current) clearInterval(intervalRef.current);
    //     };
    // }, [authStatus.isAuthenticated, authStatus.isLoading, navigate]);

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
            } else if (authStatus.Permissions[Access].access) {
                return children

            } else {
                return <Navigate to="/admin" />
            }
        }
    }



    //   return children;
};

export default AdminRoute;