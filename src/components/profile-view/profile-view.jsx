import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Row } from 'react-bootstrap';

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

  const handleDelete = () => {
    axios.delete(`https://gathering-of-films.herokuapp.com/users/${currentUser}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The account ${user.Username} was successfully deleted.`)
      localStorage.clear();
      window.open('/register', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Container id="profile-form">
        <UserInfo name={user.Username} email={user.Email}/>
        <Row className="mt-5"><h4>Your favourite movies</h4></Row>
        <Row className="mt-3">
          <FavouriteMoviesView 
          movies={movies} 
          favouriteMovies={favouriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <UpdateView user={user}/>
        <Button className="d-block mt-5" variant="warning" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}