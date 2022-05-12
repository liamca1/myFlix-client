import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [
                { _id: 1, Title: 'Isle of Dogs', Description: 'desc1...', ImagePath: '...'},
                { _id: 2, Title: 'Marley and Me', Description: 'desc1...', ImagePath: '...'},
                { _id: 3, Title: 'Cmon Cmon', Description: 'desc1...', ImagePath: '...'}
            ],
            selectedMovie: null
        }
    }
    
    setSelectedMovie(newSelectedMovie){
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;
        console.log("MOV", movies)
      
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
      
        return (
          <div className="main-view">
              {
                  selectedMovie
                  ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  : movies.map(singleMovie => (
                    <MovieCard key={singleMovie._id} movie={singleMovie} onMovieClick={(singleMovie) => { this.setSelectedMovie(singleMovie) }}/>
                  ))
              }
          </div>
        );
      }
}
