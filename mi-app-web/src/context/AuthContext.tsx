import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: { id: string; email: string } | null;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const storedUser = sessionStorage.getItem('user');
    
    // ✅ Verifica que `storedUser` es válido antes de intentar parsearlo
    if (token && storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser) as { id: string; email: string };
        if (parsedUser && parsedUser.id) {
          setUser(parsedUser);
          // ✅ Evita que navigate() se ejecute en momentos inesperados
          if (location.pathname === '/login') {
            setTimeout(() => {
              navigate('/templatelist', { replace: true });
            }, 100);
          }
        }
      } catch (error) {
        console.error('Error al parsear usuario almacenado:', error);
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
    }
  }, [location, navigate]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
 
    try {
      const response = await axios.post<{ token: string; user: { id: string; email: string } }>(
        'http://localhost:3000/auth/login',
        { email, password }
      );
 
      const { token, user } = response.data;
      console.log("✅ Token recibido:", token);
      console.log("✅ Usuario recibido:", user);
 
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
 
      console.log("✅ Usuario guardado en sessionStorage:", sessionStorage.getItem('user'));
 
      setUser(user);
     
      navigate('/templatelist', { replace: true });
 
    } catch (err) {
      console.error('❌ Error en login:', err);
      setError('Error en el inicio de sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};