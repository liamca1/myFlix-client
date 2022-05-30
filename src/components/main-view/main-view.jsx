import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
// import { Navbar } from '../navbar/navbar';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
// import { LoginView } from '../login-view/login-view';
// import { RegistrationView } from '../registration-view/registration-view';
// import { DirectorView } from '../director-view/director-view';
// import { ProfileView } from '../profile-view/profile-view';

import './main-view.scss';

export class MainView extends React.Component {
  constructor(){
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }
  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getmovies(accessToken);
    }
  }
  onLoggedIn(authData) {
    console.log(authData);

    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  getMovies(token) {
    axios.get('https://gathering-of-films.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
              if (!user) return <Col>
                <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                // Before the movies have been loaded
                if (movies.length === 0) return <div className="main-view" />;

                return movies.map(m => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movie-director/:id" render={({match, history}) => {
              return <Col>
              <DirectorView movie={movies.find(m => m._id === match.params.id )} onBackClick={() => history.goBack()}/>
              </Col>
            }} />
            <Route path={`/users/${user}`} render={({match, history}) => {
              if (!user) return <Redirect to="/" />
              return <Col>
              <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
              </Col>
            }} />
            <Route path={`/user-update/${user}`} render={({match, history}) => {
              if (!user) return <Redirect to="/" />
              return <Col>
              <UserUpdate user={user}
              onBackClick={() => history.goBack()}/>
              </Col>
            }} />
          </Row>
        </Container>
      </Router>
    );
  }
}