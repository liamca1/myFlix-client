import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Card, Col, Container, Row, Stack } from 'react-bootstrap';

import { FavouriteMoviesView } from './favourite-movie-view';
import { UpdateView } from './update-view';
import { UserInfo } from './user-info';


import './profile-view.scss';

export function ProfileView(props) {
  const [ user, setUser ] = useState(props.user);
  const [ movies, setMovies ] = useState(props.movies);
  const [ favouriteMovies, setFavouriteMovies ] = useState([]);
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios.get(`https://gathering-of-films.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      setUser(response.data);
      setFavouriteMovies(response.data.FavouriteMovies)
    })
    .catch(error => console.error(error))
  }

  useEffect(() => {
    getUser();
  }, [])



  return (
    <Container>
      <Stack gap={3}>
        
        <Row>
          <Card>
            <Card.Body>
              <Col xs={12} sm={4}>
                <UserInfo name={user.Username} email={user.Email}/>
              </Col>
            </Card.Body>
          </Card>
        </Row>

        <Row>
          <Card>
            <Card.Body>
                <FavouriteMoviesView 
                movies={movies} 
                favouriteMovies={favouriteMovies} 
                currentUser={currentUser} 
                token={token}/>
            </Card.Body>
          </Card>
        </Row>

        <Row>
          <Card>
            <Card.Body>
              <UpdateView user={user}/>
            </Card.Body>
          </Card>
        </Row>
        
      </Stack>
    </Container>
  )
}