import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

//get array of movies from remote API and displaying as a list
export class MainView extends React.Component {

    constructor(){
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            registered: null,
            user: null
        };
    }

    componentDidMount() {
        axios.get('https://gathering-of-films.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    //sets the selected movie state with a value
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
    }

    //sets state to current user (when user is verified)
    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    onRegister(registered) {
      this.setState({
        registered
      });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        if (!registered) {
          return ( <RegistrationView onRegister={(val) => this.onRegister(val)} />
          );
        }

        if (!user) {
          return (
            <LoginView
              onLoggedIn={(user) => this.onLoggedIn(user)}
              // onRegister={(val) => this.onRegister(val)}
            />
          );
        }

        /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
        if (movies.length === 0) 
          return <div className="main-view" />;
        
        //if no movie is selected then show the list -
        //if a movie is selected then show the Movie View details
        return (
          <div className="main-view">
            {selectedMovie ? (
              <MovieView 
                movie={selectedMovie}
                onBackClick={newSelectedMovie => { 
                  this.setSelectedMovie(newSelectedMovie); 
                }}/>)
              : movies.map((movie) => (
                <MovieCard 
                  key={movie._id} 
                  movie={movie} 
                  onMovieClick={(newSelectedMovie) => { 
                    this.setSelectedMovie(newSelectedMovie); 
                  }}/>
              ))
            }
          </div>
        );
      }
    }
    