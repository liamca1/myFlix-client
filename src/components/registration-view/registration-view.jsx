import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState ('');

    const [usernameErr, setUsernameErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [emailErr, setEmailErr] = useState("");

    const validate = () => {
      let isReq = true;

    if (!username) {
      setUsernameErr("Username is required!");
      isReq = false;
    } else if (username.length < 3) {
      setUsernameErr("Username must be at least 3 characters long");
      isReq = false;
    }

    if (!password) {
      setPasswordErr("Password is required!");
      isReq = false;
    }

    if (!email) {
      setEmailErr("Email is required!");
      isReq = false;
    }
    return isReq;
  };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

        if (isReq) {
          axios
            .post(`${API_ROOT}/users`, {
              userName: username,
              password: password,
              email: email,
              birthday: birthday,
            })
            .then((response) => {
              const data = response.data;
              alert("Registration successful!");
              window.open("/", "_self");
            })
            .catch((e) => {
              console.log("Could not register");
              alert("Unable to register");
            });
        }
      };

        // props.onRegistration(username);


return (
        <Row>
            <Col>
                <CardGroup>
                    <Card className='registration-form'>
                        <Card.Body className='reistration-card'>
                            <Card.Title>Please register</Card.Title>
                                <Form className='registration-form'>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label className='registration-form'>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            onChange={e => setUsername(e.target.value)} placeholder="Enter a username" />
                                            {usernameErr && <p className="font-italic">{usernameErr}</p>}
                                       </Form.Group>
                                    
                                    <Form.Group controlId='formPassword'>
                                        <Form.Label className='registration-form'>Password</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            placeholder="Enter your password" 
                                            onChange={e => setPassword(e.target.value)} 
                                        />
                                            {passwordErr && <p className="font-italic">{passwordErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId='formEmail'>
                                        <Form.Label className='registration-form'>Email</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            placeholder="Enter your email adress" 
                                            onChange={e => setEmail(e.target.value)} 
                                        />
                                            {emailErr && <p className="font-italic">{emailErr}</p>}
                                    </Form.Group>

                                    <Form.Group controlId='formBirthday'>
                                        <Form.Label className='registration-form'>Birthday</Form.Label>
                                        <Form.Control
                                            type="date"
                                            onChange={e => setBirthday(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Button variant="primary" 
                                        type="submit"
                                        onClick={handleSubmit}>
                                        Sign Up
                                    </Button>
                                </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>        
    )

}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired
    }),
    onRegistration: PropTypes.func.isRequired
};