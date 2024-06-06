import React from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ErrorComp: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Alert variant="danger" className="text-center">
            <Alert.Heading>Error!</Alert.Heading>
            <p>El artículo buscado no es válido.</p>
            <p>Por favor ingresa un identificador válido.</p>
            <div className="d-flex justify-content-center">
              <Button variant="primary" onClick={() => navigate("/")}>Volver al Home</Button>
            </div>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorComp;
