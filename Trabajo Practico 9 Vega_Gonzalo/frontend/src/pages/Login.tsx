import React, { useState } from 'react';
import { Form, Col, Row, Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import User from '../entities/User';
import AuthService from '../services/AuthService';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [user, setUser] = useState<User>({ email: '', password: '', fullName: '', role: null });
    const [validationMessage, setValidationMessage] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!user.email || user.email.trim() === '') {
            setValidationMessage('Ingrese el nombre de usuario (correo electrónico)');
            return;
        }

        if (!user.password || user.password.trim() === '') {
            setValidationMessage('Ingrese la contraseña');
            return;
        }

        try {
            const loggedInUser = await AuthService.login(user);
            login(loggedInUser); // Utiliza el método login del contexto para actualizar el estado global
            navigate('/menu', {
                replace: true,
                state: {
                    logged: true,
                    user: loggedInUser,
                },
            });
        } catch (error) {
            setValidationMessage('Usuario y/o clave incorrectas');
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    <Card className="p-4">
                        <Card.Header>
                            <Card.Title>Iniciar sesión</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="email">
                                    <Form.Label>Correo electrónico:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email" // Set name attribute for clarity
                                        value={user.email} // Update value based on user state
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="password">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password" // Set name attribute for clarity
                                        value={user.password} // Update value based on user state
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                {validationMessage && (
                                    <div className="text-danger">{validationMessage}</div>
                                )}
                                <Button className="mt-4" variant="primary" type="submit">
                                    Iniciar sesión
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
