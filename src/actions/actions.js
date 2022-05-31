export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

export function setMovies(value) {
    return { type: SET_MOVIES, value };
}

export function setFilter(value) {
    return { type: SET_FILTER, value };
}

/*
A SET_MOVIES action will initialize the movies property;
A SET_FILTER action will change the visibilityFilter property
*/