import React, { useEffect, useState ,useRef} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Lottie/loading.json";
const CHECK_INTERVAL_MS = 60_000;
const ProtectedRoute = ({ children, roles = [] }) => {
    const [authStatus, setAuthStatus] = useState({
        isAuthenticated: false,
        role: null,
        isLoading: true
    });
    const navigate= useNavigate();
    const intervalRef = useRef(null); 

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
    }, [roles]);
    useEffect(() => {
       
        if (authStatus.isLoading || !authStatus.isAuthenticated) return;

        const tick = async () => {
            try {
              const { isAuthenticated, role } = await getAuth();
                setAuthStatus({
                    isAuthenticated,
                    role,
                    isLoading: false
                });        // optional if refresh does a verify
            } catch (err) {
                try { await logout(); } catch { }
                setAuthStatus({ isAuthenticated: false, role: null, isLoading: false });
                navigate("/", { replace: true });
            }
        };
        const onVisibility = () => {
            if (document.visibilityState === "visible") tick();
        };
        document.addEventListener("visibilitychange", onVisibility);

        tick();
        intervalRef.current = setInterval(() => {
            if (document.visibilityState === "visible" && navigator.onLine) tick();
        }, CHECK_INTERVAL_MS);

        return () => {
            document.removeEventListener("visibilitychange", onVisibility);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [authStatus.isAuthenticated, authStatus.isLoading, navigate]);

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

    if (!authStatus.isAuthenticated) {
        return <Navigate to="/login" />;
    }
    if (authStatus.isAuthenticated) {
        if (roles.includes(authStatus.role)) {
            return children
        } else if (authStatus.role === "user") {
            return <Navigate to="/user" />

        } else if (authStatus.role === "admin") {
            return <Navigate to="/admin" />
        }
    }

    if (roles.length && !roles.includes(authStatus.role)) {
        return <Navigate to="/" />;
    }

    //   return children;
};

export default ProtectedRoute;