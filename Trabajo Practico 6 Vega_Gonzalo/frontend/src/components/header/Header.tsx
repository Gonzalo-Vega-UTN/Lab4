import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'; // Assuming you're using React Router

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" style={{ minHeight: '5vh', padding: '0' }}>
        <Container>
          <Nav className="me-auto">
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
            <Nav.Item>
              <Nav.Link as={NavLink} to="/gestion" className="text-light">
                Gestion
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
