import { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import User from "../entities/User";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {

  const [user, setUser] = useState<User>({id: null, email: '', password: '', fullName: '', role: null }); //Se guardan en backend como USER siempre
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validations()) return;

    try {
      const loggedInUser = await AuthService.register(user);
      login(loggedInUser);
      navigate('/menu', {
        replace: true,
        state: {
          logged: true,
          user: loggedInUser,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setValidationMessage(error.message);
      } else {
        setValidationMessage('Hubo un error');
      }

    }
  };

  const validations = (): boolean => {
    if (!user.fullName || user.fullName.trim() === '') {
      setValidationMessage('Ingrese su Nombre Completo');
      return false;
    }

    if (!user.email || user.email.trim() === '') {
      setValidationMessage('Ingrese el nombre de usuario (correo electrónico)');
      return false;
    }

    if (!user.password || user.password.trim() === '') {
      setValidationMessage('Ingrese la contraseña');
      return false;
    }

    if (!confirmPassword || confirmPassword.trim() === '') {
      setValidationMessage('Ingrese la repeticion de contraseña');
      return false;
    }
    if (user.password !== confirmPassword) {
      setValidationMessage('Las contraseñas no coinciden');
      return false;
    }

    return true;
  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <Card className="p-4">
              <Card.Header>
                <Card.Title>Registro</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="fullName">
                    <Form.Label>Nombre completo:</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={user.fullName}
                      onChange={handleChange}

                    />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Label>Correo electrónico:</Form.Label>
                    <Form.Control
                      type="email"
                      value={user.email}
                      name="email"
                      onChange={handleChange}

                    />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}

                    />
                  </Form.Group>
                  <Form.Group controlId="confirmPassword">
                    <Form.Label>Confirmar contraseña:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}

                    />
                  </Form.Group>
                  {validationMessage && (
                    <div className="text-danger">{validationMessage}</div>
                  )}
                  <Button className="mt-4" variant="primary" type="submit">
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
