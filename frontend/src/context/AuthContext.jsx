import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getMe } from '../api/auth.api';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    async function checkAuth() {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                const { data } = await getMe();
                setUser(data);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth check failed", error);
                logout();
            }
        }
        setIsLoading(false);
    }

    const login = async (credentials) => {
        try {
            const { data } = await apiLogin(credentials);
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Get user details immediately
            const meRes = await getMe();
            setUser(meRes.data);
            setIsAuthenticated(true);
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (userData) => {
        try {
            await apiRegister(userData);
            return true;
        } catch (error) {
            console.error("Registration failed", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
        setIsAuthenticated(false);
        toast.success('Logged out successfully');
    };

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthenticated, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
