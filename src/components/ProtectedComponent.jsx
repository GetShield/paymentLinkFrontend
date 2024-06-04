import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useToken } from '../providers/AuthContext';

const ProtectedComponent = ({ children }) => {
    const { token } = useToken();

    if (!token) {
        // Si el usuario no está autenticado, redirigir al login
        return <Navigate to="/login" />;
    }

    // Si el usuario está autenticado, renderizar el componente hijo
    return children;
};

export default ProtectedComponent;
