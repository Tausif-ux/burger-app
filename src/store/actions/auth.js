import * as actionTypes from './actionTypes';
import axios from 'axios'; 

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimout = expiresIn => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expiresIn * 1000);
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const API_KEY = 'AIzaSyBHOjUx3QRQe8UOKdmFrDzJ3QtL-2pU_yE';
        const authData = {
            email: email, 
            password: password,
            returnSecureToken: true
        };
        let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
        if(!isSignUp) {
            url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
        }
        
        axios.post(url, authData)
        .then(response => {
            console.log(response.data);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimout(response.data.expiresIn));
        })
        .catch(error => {
            console.log(error.response.data.error);
            dispatch(authFail(error.response.data.error));
        });
    };
};