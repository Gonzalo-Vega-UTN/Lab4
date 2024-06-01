import { useState } from "react";
import { Container, Row, Col, Card, Button, Form} from "react-bootstrap";

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Nombre:', nombre);
    console.log('Correo electrónico:', email);
    console.log('Contraseña:', password);
    console.log('Confirmar contraseña:', confirmPassword);
    // Replace with your actual registration logic
  };

  return (
    <>
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <Card className="p-4">
            <Card.Header bg="primary" text="white">
              <Card.Title>Registro</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre completo:</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Correo electrónico:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirmar contraseña:</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Registrarse
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Register;
