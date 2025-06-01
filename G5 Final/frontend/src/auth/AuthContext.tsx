import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type DecodedToken = {
  name: string;
  picture: string;
  email?: string;
  exp: number; // para controlar expiración
};

type User = {
  name: string;
  picture: string;
  email?: string;
};

type AuthContextType = {
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) login(token);
}, []);


  const login = (token: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      localStorage.setItem('token', token);
      setUser({
        name: decoded.name,
        picture: decoded.picture,
        email: decoded.email,
      });
    } catch (error) {
      console.error('Token inválido');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};
