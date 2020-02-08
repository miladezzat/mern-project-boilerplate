import axios from 'axios';
import { returnErrors } from './errorActions'
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: AUTH_ERROR });
        })
}

export const register = ({ name, email, password }) => dispatch => {
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    //request
    const body = JSON.stringify({ name, email, password });
    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL,
            })
        })
}

// logout user
export const logout = () => { 
    return{
        type: LOGOUT_SUCCESS
    }
}

// Setup config/header and token

export const tokenConfig = getState => {
    // Get token from localstorage
    const token = getState().authReducer.token;
    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // if token, add to header
    if (token) {
        config.headers['x-auth-token'] = token
    }
    return config;
}