import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import axios from "axios";

import { CardGroup, Container, Button, Card, Col, Row } from "react-bootstrap";

import "./movie-card.scss";


export class MovieCard extends React.Component {

  addToFavouriteList(movieId) {
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.put(`https://gathering-of-films.herokuapp.com/users/${currentUser}/movies/${movieId}`, 
    {},
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      console.log(response.data)
      alert(`The movie was successfully added to your list.`)
    }).
    catch(error => console.error(error))
  }

  render() {
    const { movie } = this.props;

    return (
      <Card style={{ width: 'auto '}} id="movie-card">
        <Link to={`/movies/${movie._id}`}>
          <Card.Img variant="top" src={movie.ImagePath} class="movie-card-img"></Card.Img>
          <Card.ImgOverlay>
            <Card.Body class="movie-card-body">
              <Card.Title >{movie.Title}</Card.Title>
              <Card.Text class="movie-card-text">{movie.Description}</Card.Text>
              <Link to={`/movies/${movie._id}`}>
                <Button className="button" variant="outline-primary" size="sm">Open</Button>
              </Link>
              <Button className="button ml-2" variant="outline-primary" size="sm" onClick={() => this.addToFavouriteList(movie._id) }>Add</Button>
            </Card.Body>
          </Card.ImgOverlay>
        </Link>
        
      </Card>
    )
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }),
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
};