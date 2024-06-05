import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const FailureMp: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container className="text-center mt-5">
            <h1>¡Pago fallido!</h1>
            <p>Lo sentimos, ha habido un problema con tu pago. Por favor, inténtalo de nuevo.</p>
            <Button variant="primary" onClick={() => navigate("/")}>Volver al Home</Button>
        </Container>
    );
};

export default FailureMp;
