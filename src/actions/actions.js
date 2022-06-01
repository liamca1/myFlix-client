export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { 
        type: SET_FILTER,
        value 
    };
}

export function setUser(token, user) {
    return {
        type: SET_USER,
        value: { token, user }
    };
}

/*
A SET_MOVIES action will initialize the movies property;
A SET_FILTER action will change the visibilityFilter property
*/