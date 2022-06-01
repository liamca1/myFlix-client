import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return SET_FILTER;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            return action.user || localStorage.getItem('user') || '';
            default:
                return state;
    }
}

const moviesApp = combineReducers({
    visibilityFilter,
    movies
});

export default moviesApp;

/*
reducers, given the same arguments, should calculate the next state and return it.
No surprises, no side effects, no API calls, no mutations. Just a calculation.
*/