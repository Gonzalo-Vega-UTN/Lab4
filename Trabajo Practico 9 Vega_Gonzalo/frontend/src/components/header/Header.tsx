// Header.tsx
import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import User from '../../entities/User';
import { Role } from '../../entities/Role';
import { useAuth } from '../../context/AuthContext';
const Header: React.FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, jsonUsuario, logout } = useAuth();

  const usuarioLogueado: User | null = jsonUsuario ? JSON.parse(jsonUsuario) as User : null;

  const handleLogout = () => {
    logout();
    navigate('/', {
      replace: true,
      state: {
        logged: false
      },
    });
  };

  return (
    <Navbar className='d-flex justify-content-between px-4' bg="dark" data-bs-theme="dark" >

      <Nav className="d-flex align-items-center">
        <Navbar.Brand as={NavLink} to="/">
          <img

            src={"/img/logo-hendrix.png"}
            className="d-inline-block align-top"
            alt="Musical Hendrix logo"
            style={{ maxHeight: '50px', maxWidth: '200px' }}
          />
        </Navbar.Brand>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/" className="text-light">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/donde-estamos" className="text-light">
            Donde Estamos
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/productos" className="text-light">
            Productos
          </Nav.Link>
        </Nav.Item>

        {isLoggedIn && usuarioLogueado?.role == Role.ADMIN && (
          <Nav.Item>
            <Nav.Link as={NavLink} to="/gestion" className="text-light">
              Gestion
            </Nav.Link>
          </Nav.Item>
        )}


        {isLoggedIn && usuarioLogueado?.role == Role.ADMIN && (
          <Nav.Item>
            <Nav.Link as={NavLink} to="/reportes" className="text-light">
              Reportes
            </Nav.Link>
          </Nav.Item>
        )}

      </Nav>

      <Nav>
        <Nav.Item>
          {isLoggedIn && usuarioLogueado ? (
            <Nav.Link onClick={handleLogout} className="text-light">
              <span className='m-4'>Usuario: {usuarioLogueado.fullName} - {usuarioLogueado.role === Role.ADMIN ? "Admin" : "User"}</span>
              <Button variant='secondary'>Cerrar Sesion</Button>
            </Nav.Link>
          ) : (
            <Nav.Link onClick={() => navigate("/login")} className="text-light">
              <Button variant='primary'>Login</Button>
            </Nav.Link>
          )}
        </Nav.Item>
        {!isLoggedIn && (
          <Nav.Item>
            <Nav.Link onClick={() => navigate("/registro")} className="text-light">
              <Button variant='primary'>Registrar</Button>
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </Navbar>
  );
};

export default Header;
