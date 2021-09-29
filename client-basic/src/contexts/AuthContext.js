import React, { useState, useContext, createContext } from "react";
import { useLocalStorage } from '../hooks/useLocalStorage';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [profile, setProfile] = useLocalStorage("profile", null);
    const [isAuthenticated, setIsAuthenticated] = useState(profile !== null);
    const handleAuth = (result, p) => {
        if (result === true) {
            setProfile(p);
        }
        else {
            setProfile(null);
        }

        setIsAuthenticated(result);
    };
    const auth = { isAuthenticated, profile };
    const data = [auth, handleAuth];
    return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth can only be used inside AuthProvider");
    }

    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};