/**
 * Contents
 */
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
import {
  callApiWithJWT
} from '../utils/api';

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_SUCCESS = 'POST_USER_SUCCESS';
export const POST_USER_FAILURE = 'POST_USER_FAILURE';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const CLEAR_USER = 'CLEAR_USER';

/**
 * Updates the user's info.
 * @param {Object} updateObject An object containing user properties to be updated (see Swagger docs for accepted properties)
 * @return callApiWithJWT
 */
export function saveUserInfo({ ...userInfo }) {
  // Remove any null, undefined, or empty strings from the request object
  const strippedObject = _omitBy(userInfo, val => _isNil(val) || val === '');
  const config = {
    url: '/user',
    method: 'put',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    data: strippedObject
  };

  return callApiWithJWT(
    config,
    userInfoRequest,
    userInfoSuccess,
    userInfoFailure
  );
}

export function getUserInfo() {
  const config = {
    url: '/user',
    method: 'GET',
    header: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  };

  return callApiWithJWT(
    config,
    userInfoRequest,
    userInfoSuccess,
    userInfoFailure
  );
}

export function clearUserInfo() {
  return {
    type: CLEAR_USER,
    data: {}
  };
}


function userInfoFailure(error) {
  return {
    type: POST_USER_FAILURE,
    error: error,
    errorMessage: error.error
  };
}

function userInfoRequest() {
  return {
    type: POST_USER_REQUEST
  };
}

function userInfoSuccess(user) {
  return {
    type: POST_USER_SUCCESS,
    user
  };
}

