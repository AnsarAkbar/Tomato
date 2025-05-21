import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        setIsLoading(false);
        setIsVerified(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (data.user) {
          setUser(data.user);
          setIsVerified(true);
          if (location.pathname === '/login') {
            navigate('/dashboard');
          }
        } else {
          localStorage.removeItem('adminToken');
          setIsVerified(false);
          if (location.pathname !== '/login') {
            navigate('/login');
          }
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        setIsVerified(false);
        if (location.pathname !== '/login') {
          navigate('/login');
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, [location.pathname]);

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      
      if (data.token) {
        localStorage.setItem('adminToken', data.token);
        
        // Verify the token immediately after login
        try {
          const verifyRes = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify`, {
            headers: {
              'Authorization': `Bearer ${data.token}`
            }
          });
          const verifyData = await verifyRes.json();
          
          if (verifyData.user) {
            setUser(verifyData.user);
            setIsVerified(true);
            setIsLoading(false);
            navigate('/dashboard');
            return { success: true };
          }
        } catch (error) {
          console.error('Verification error:', error);
        }
      }
      
      setIsLoading(false);
      return { success: false, error: data.message || 'Login failed' };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setIsVerified(false);
    navigate('/login');
  };

  const value = {
    user,
    isLoading,
    isVerified,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 