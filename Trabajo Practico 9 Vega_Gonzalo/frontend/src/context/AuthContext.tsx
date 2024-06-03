// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  jsonUsuario: string | null;
  login: (user: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  jsonUsuario: null,
  login: (user: any) => {},
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('user'));
  const [jsonUsuario, setJSONUsuario] = useState(sessionStorage.getItem('user'));

  const login = (user: any) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setJSONUsuario(JSON.stringify(user));
    setIsLoggedIn(true);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setJSONUsuario(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, jsonUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
