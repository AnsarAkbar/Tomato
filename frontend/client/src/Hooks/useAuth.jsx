import { useState, useEffect } from 'react';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState( false);
    const [loading, setLoading] = useState(true);
    const { fetchData } = useFetch()
    const navigate = useNavigate()

    
    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('clientToken');
            if (!token) {
                setIsAuthenticated(false);
                setLoading(false);
                return;
            }

            // Verify token with backend
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                localStorage.removeItem('clientToken');
                setIsAuthenticated(false);
            } else {
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('clientToken');
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        // console.log(credentials)
        try {
            const response= await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
            // console.log(response)
            if (response.data.error) {
                return { success: false, error: response.data.error }
            }

            const { token } = response.data;
            // console.log('Token-->', token)
            localStorage.setItem('clientToken', token);
            setIsAuthenticated(true);
            navigate('/');
            return { success: true };
        } catch (error) {
            // console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('clientToken');
        setIsAuthenticated(false);
    };

    const signup = async (credentials) => {
        console.log(credentials)
        if (credentials.password !== credentials.confirmPassword) {
            return { success: false, error: 'Passwords do not match' }
        }
        try {
            // const response = await fetchData({
            //     url: `${import.meta.env.VITE_API_URL}/auth/register`,
            //     method: 'POST',
            //     body: credentials
            // })
            // console.log(response)
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, credentials)
            return { success: true }
        } catch (error) {
            console.log(error.message)
            return { success: false, error: error.message }
        }
    };

    return {
        isAuthenticated,
        loading,
        login,
        logout,
        signup
    };
};