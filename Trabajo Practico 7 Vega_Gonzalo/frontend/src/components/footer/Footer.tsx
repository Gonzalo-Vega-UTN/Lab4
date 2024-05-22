import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <>
  <footer className="footer" style={{ backgroundColor: '#212529', color: '#fff' }}>
  <Container style={{minHeight: "4.5vh", padding: "0"}}>
        <Row>
          <Col xs={12} md={6}>
            <p>&copy; {new Date().getFullYear()} Your Company Name</p>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
         
          </Col>
        </Row>
      </Container>
    </footer>
    </>
  );
};

export default Footer;
