import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto
export const AuthContext = createContext();
export const useToken = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [merchant, setMerchant] = useState(null);

    // Función para iniciar sesión
    const login = (dataUser) => {
        console.log(dataUser, "datauser")
        setToken(dataUser.token);
        setMerchant(dataUser.merchant)
        localStorage.setItem("merchant", JSON.stringify(dataUser.merchant))
        localStorage.setItem('token', dataUser.token);
    };

    // Función para cerrar sesión
    const logout = () => {
        setToken(null);
        setMerchant(null);
        localStorage.removeItem('token');
    };

    // Recuperar el token del localStorage al cargar la aplicación
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const merchant = localStorage.getItem('merchant');

        if (storedToken) {
            setToken(storedToken);
        }
        if (storedToken) {
            setMerchant(JSON.parse(merchant))
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, login, logout, merchant, setMerchant }}>
            {children}
        </AuthContext.Provider>
    );
};
