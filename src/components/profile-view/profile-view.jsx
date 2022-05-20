import React, { useEffect } from "react";
import axios from "axios";
import React, {useState} from "react";
import { Button }  from "react-bootstrap";
import './profile-view.scss';

//import {UpdateUser} from './update-user';
//import {UserInfo} from './user-info';
//import {FavouriteMovies} from './favourite-movies';


export function ProfileView(props) {

    const [updatedUser, setUpdatedUser] = useState('');
    const [userdata, setUserdata] =  useState('');
    const [favouriteMoviesList, setFavoriteMoviesList] = useState('');

    let token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

    const getUserData = (cancelToken, username) => {
      axios.get(`https://gathering-of-films.herokuapp.com/users/${username}`, {
        cancelToken: cancelToken
      })
        .then(response => {
          setUserdata(response.data);
          setFavoriteMoviesList(props.movies.filter(m => response.dataFavouriteMovies.includes(m._id)));
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
      let source = axios.CancelToken.source();

      if (token !== null) {
        getUserData(source.token, props.user);
      } else {
        console.log('Not Authorized');
      }

      return() => {
        source.cancel();
      }
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.put(`https://gathering-of-films.herokuapp.com/users/${userdata.Username}`, updatedUser)
      .then(response => {
        setUserdata(response.data);
        alert('Profile updated');
      })
      .catch(e => {
        console.log(e);
      });
    }


    const handleUpdate = (e) => {
      setUpdatedUser({
        ...updatedUser,
        [e.target.name]: e.target.value
      })
    }

    const deleteProfile = (e) => {
      axios.delete(`https://gathering-of-films.herokuapp.com/users/${userdata.Username}`)
      .then(response => {
        alert('Your profile has beeen deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token')

        window.open('/', '_self');
      })
      .catch(e => {
        console.log(e);
      });
    }

    const removeFav = (id) => {
      axios.delete(`https://gathering-of-films.herokuapp.com/users/${userdata.Username}/movies/${id}`)
          .then(() => {
              // Change state of favouriteMovieList to render component
              setFavouriteMoviesList(favouriteMoviesList.filter(movie => movie._id != id));
          })
          .catch(e => {
              console.log(e);
          });
  }


  return (
      <>
          {/* Display userdata */}
          <userdata userdata={userdata} />

          {/* Form to update user data */}
          <UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

          {/* Button to delete user */}
          <div>
              <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
                  Delete Profile
              </Button>
          </div>

          {/* List of favourite movies */}
          <FavouriteMovies favouriteMoviesList={favouriteMoviesList} removeFav={removeFav} />


          <div>
              <Button variant="outline-light" onClick={() => { props.onBackClick() }}>Back to full list</Button>
          </div>
      </>
  );


}

  