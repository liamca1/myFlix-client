import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack'
import { Container } from 'react-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">

<Row>
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
</Row>
<Row>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
</Row>
<Row>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
</Row>
<Row>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
</Row>
      </div>


      
          );
  }
}