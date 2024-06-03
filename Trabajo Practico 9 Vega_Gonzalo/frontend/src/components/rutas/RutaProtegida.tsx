import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../entities/Role';

interface RutaProtegidaProps {
  children: React.ReactNode;
  role: Role;
}

const RutaProtegida: React.FC<RutaProtegidaProps> = ({ children, role }) => {
  const { isLoggedIn, jsonUsuario } = useAuth();
  const usuarioLogueado = jsonUsuario ? JSON.parse(jsonUsuario) : null;

  if (!isLoggedIn || !usuarioLogueado || usuarioLogueado.role !== role) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RutaProtegida;
