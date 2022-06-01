import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Button, Card, CardGroup, Col, Container, Row, Stack } from 'react-bootstrap';

import './profile-view.scss';

export function FavouriteMoviesView(props) {
  const { movies, favouriteMovies, currentUser, token } = props;

  const favouriteMoviesId = favouriteMovies.map(m => m._id)

  const favouriteMoviesList = movies.filter(m => {
    return favouriteMoviesId.includes(m._id)
  })

  const handleMovieDelete = (movieId) => {
    axios.delete(`https://https://gathering-of-films.herokuapp.com/movies/users/${currentUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(() => {
      alert(`The movie was successfully deleted.`)
      window.open('/users/:username', '_self');
    }).
    catch(error => console.error(error))
  }

  return (
    <Fragment>
      <Container fluid>
        <Col id="fav-cards-div"><h4>Your favourite movies</h4>
          </Col>
          {favouriteMoviesList.length === 0 ? (
          <p>You have no favourite movies yet.</p>
          ) : (
            favouriteMoviesList.map((movie) => {
              return (
                
                  <Row md={2} lg={3}>
                    <Col>
                      <CardGroup>
                      <Card>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Img variant="top" src={movie.ImagePath} />
                        </Link>
                        <Card.Body>
                          <Card.Title>{movie.Title}</Card.Title>
                            <Stack direction="horizontal" gap={1}>
                            <Link to={`/movies/${movie._id}`}>
                            <Button id="favourite-button-open" variant="outline-primary" size="sm">Open</Button>
                          </Link>
                          <Button id="favourite-button-remove"
                          variant="outline-primary" 
                          size="sm" onClick={()=> {handleMovieDelete(movie._id)}} >
                            Remove
                          </Button>
                            </Stack>
                        </Card.Body>
                      </Card>
                      </CardGroup>
                    </Col>
                  </Row>

              )
            })
          )
        }
      </Container>
    </Fragment>
  )
}