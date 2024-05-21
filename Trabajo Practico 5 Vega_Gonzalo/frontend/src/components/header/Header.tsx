import React from 'react';
import { Container, Nav, Navbar, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ minHeight: '5vh', padding: '0' }}>
        <Container>
          <Nav className="me-auto">
            <NavLink ><Link to="/">Home</Link></NavLink>
            <NavLink ><Link to="/donde-estamos">Donde Estamos</Link></NavLink>
            <NavLink ><Link to="/productos">Productos</Link></NavLink>
            <NavLink ><Link to="/gestion">Gestion</Link></NavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
