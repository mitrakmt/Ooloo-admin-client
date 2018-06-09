/**
 * Contents
 * 1. Login
 * 2. Registration
 */

import {
  ACCESS_TOKEN,
  callApi,
  callApiWithJWT,
  decodeUserProfile,
  loadRefreshToken,
  removeTokens,
  setAccessToken,
  setUserId
} from 'utils/api';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// Login
function loginRequest(user) {
  return {
    type: LOGIN_REQUEST,
    user
  };
}

function loginSuccess(payload) {
  if (payload.Authorization) {
    const accessToken = payload.Authorization;
    const profile = decodeUserProfile(accessToken);
    if (!profile.isAdmin) {
      return {
        type: LOGIN_FAILURE
      };
    }
    setAccessToken(accessToken);
    setUserId(profile.id);
    return {
      type: LOGIN_SUCCESS,
      profile
    };
  }
  return {
    type: LOGIN_FAILURE
  };
}

function loginFailure(error) {
  if (error) {
    removeTokens();
    return {
      type: LOGIN_FAILURE,
      error
    };
  }
  return {
    type: LOGIN_FAILURE,
    error
  };
}

/**
 * Calls the login API.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {object} The status object returned by the server.
 */
export function login(email, password) {
  const config = {
    url: `${process.env.REACT_APP_API_DOMAIN}/user/login`,
    method: 'post',
    data: {
      email,
      password
    }
  };

  return callApi(config, loginRequest(email), loginSuccess, loginFailure);
}

// TODO: Implement refresh tokens
/**
 * Reauthenticates the user based on the refresh token in local storage.
 * @param {string} refreshToken
 */
export function refreshLogin(refresh_token = loadRefreshToken()) {
  const config = {
    url: `${process.env.REACT_APP_API_DOMAIN}/user/verify`,
    method: 'post',
    data: {
      refresh_token
    }
  };

  return callApi(config, loginRequest(refresh_token), loginSuccess, loginFailure);
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

function logoutSuccess(payload) {
  removeTokens();
  return {
    type: LOGOUT_SUCCESS
  };
}

function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    error
  };
}

/**
 * Removes the locally stored refresh and access tokens and calls the logout API.
 */
export function logout() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const config = {
    url: `${process.env.REACT_APP_API_DOMAIN}/user/logout`,
    method: 'delete',
    headers: {
      Authorization: `${accessToken}`
    }
  };

  return callApiWithJWT(config, logoutRequest, logoutSuccess, logoutFailure);
}

function saveUserSuccess() {
  return {
    type: 'SAVE_USER_SUCCESS'
  };
}

/**
 * [Beta] Haven't used this too much, may have bugs.
 * Saves the user to the redux store.
 */
export function saveUserToStore() {
  return dispatch => dispatch(saveUserSuccess());
}
