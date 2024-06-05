import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SuccessMP: React.FC = () => {
  const navigate = useNavigate();

 

  return (
    <Container className="text-center mt-5">
      <h1>¡Pago exitoso!</h1>
      <p>Gracias por tu compra. Tu pago ha sido procesado correctamente.</p>
      <Button variant="primary" onClick={() => navigate("/")}>Volver al Home</Button>
    </Container>
  );
};

export default SuccessMP;
