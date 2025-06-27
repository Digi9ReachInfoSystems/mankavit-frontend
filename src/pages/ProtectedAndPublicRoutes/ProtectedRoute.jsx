import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAuth } from '../../utils/authService';

const ProtectedRoute = ({ children, roles = [] }) => {
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
  }, [roles]);

  if (authStatus.isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!authStatus.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if(authStatus.isAuthenticated){
   if(roles.includes(authStatus.role)){
    return children
   }else if(authStatus.role === "user"){
    return <Navigate to="/user" />

   }else if(authStatus.role === "admin"){
    return <Navigate to="/admin" />
   }
  }

  if (roles.length && !roles.includes(authStatus.role)) {
    return <Navigate to="/" />;
  }

//   return children;
};

export default ProtectedRoute;