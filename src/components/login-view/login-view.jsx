import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import "./login-view.scss";

import axios from 'axios';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Declear hook for each input
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = flase;
    }else if(username.length < 2){
      setUsernameErr('Username must be at least 2 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
     }else if(password.length < 6){
      setPassword('Password must be 6 characters long');
      isReq = false;
     }
 
     return isReq;
 }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://gathering-of-films.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response =>{
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
    }
  };

  return (
    <Form className='login-view'>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter username" onChange={e => setUsername(e.target.value)} />
            {usernameErr && <p>{usernameErr}</p>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
            {passwordErr && <p>{passwordErr}</p>}
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>

    </Form>
  );
}

LoginView.propTypes = {
  register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired
};