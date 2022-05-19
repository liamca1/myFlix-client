import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState ('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

        props.onRegistration(username);
    };



return (
    <Container>
        <Row>
            <Col>
                <CardGroup>
                    <Card className='registration-form'>
                        <Card.Body className='reistration-card'>
                            <Card.Title>Please register</Card.Title>
                                <Form className='registration-form'>
                                    <Form.Group className='registration-form'>
                                        <Form.Label className='registration-form'>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)} 
                                            required 
                                            placeholder="Enter a username" 
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className='registration-form'>
                                        <Form.Label className='registration-form'>Password</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)} 
                                            required
                                            placeholder="Enter a Password"
                                            minLength="8" 
                                        />
                                    </Form.Group>

                                    <Form.Group className='registration-form'>
                                        <Form.Label className='registration-form'>Email</Form.Label>
                                        <Form.Control className='registration-form'
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                            required
                                            placeholder="Enter your email adress" 
                                        />
                                    </Form.Group>

                                    <Button variant="primary" 
                                        type="submit"
                                        onClick={handleSubmit} className='registration-form'>
                                        Register
                                    </Button>
                                </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>
        
    )

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};