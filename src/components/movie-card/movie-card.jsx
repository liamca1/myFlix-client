import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import "./movie-card.scss";

import { CardGroup, Container, Button, Card, Col, Row } from "react-bootstrap";

export class MovieCard extends React.Component {
  render () {
      const { movie, onMovieClick } = this.props;
      
      return (
      <Container>
        <CardGroup>
          <Card id="movie-card" style={{ width: '20rem', height: '20rem',margin: '.5rem' }}>
            <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title id="card-title">{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                <Button className="yellow-link" variant="link">Details</Button>
                </Link>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
    )
  };
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    // Year: PropTypes.string.isRequired,
    // Genre: PropTypes.shape({
    //   Name: PropTypes.string.isRequired,
    //   Description: PropTypes.string.isRequired,
    // }).isRequired,
    Director: PropTypes.shape({
      // Name: PropTypes.string.isRequired,
      // About: PropTypes.string.isRequired,
      // Born: PropTypes.string.isRequired,
      // Death: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
 
};