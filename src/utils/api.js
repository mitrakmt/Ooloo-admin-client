import Axios from 'axios';
import jwtDecode from 'jwt-decode';

const axios = Axios.create({
  baseURL: process.env.REACT_APP_API_DOMAIN,
  timeout: 9000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

/**
 * A utility to call a restful service.
 * @param {Object} config The config object of the call. Can be null.
 * @param {function} request The request action.
 * @param {function} onRequestSuccess The callback function to create request success action.
 *                 The function expects response json payload as its argument.
 * @param {function} onRequestFailure The callback function to create request failure action.
 *                 The function expects error as its argument.
 */
export function callApi(
  config,
  request,
  onRequestSuccess,
  onRequestFailure
) {
  return ((dispatch) => {
    dispatch(request);
    return axios.request(config)
      .then(res => dispatch(onRequestSuccess(res.data)))
      .catch(error => dispatch(onRequestFailure(error.response)));
  });
}

/**
 * A network request with no associated action.
 * @param {Object} configObject An object containing configuration options for the request.
 * @returns {Promise} The server data or error response.
 */
export function request(configObject) {
  const token = loadToken();
  const config = configObject || {};
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `${token}`;

  return axios.request(config)
    .then(res => res.data)
    .catch(error => error.response);
}

/**
 * A wrapper that adds the JWT token.
 * @param {*} configObject
 * @param {*} request
 * @param {*} onRequestSuccess
 * @param {*} onRequestFailure
 */
export function callApiWithJWT(
  configObject,
  request,
  onRequestSuccess,
  onRequestFailure
) {
  const token = loadToken();
  const config = configObject;
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = `${token}`;

  return callApi(
    config,
    request,
    onRequestSuccess,
    onRequestFailure
  );
}

export function grabS3Tokens(isUserProfile, ownerId, buffer) {
  const settings = {
    url: `/upload/image/params?album_type=PROFILE&album_owner_id=${ownerId}`,
    async: true,
    crossDomain: true,
    method: 'GET',
    headers: {
      enctype: 'multipart/form-data',
      AccessControlAllowOrigin: '*',
      cacheControl: 'no-cache'
    }
  };
  return nonActionApiWithJWT(settings)
    .then((response) => {
      const form = new FormData();
      form.append('bucket', response.data.s3_policy.conditions[0].bucket);
      form.append('key', response.data.s3_policy.conditions[1].key);
      form.append('acl', 'public-read');
      form.append('content-type', 'image/jpg');
      form.append('x-amz-credential', response.data.s3_policy.conditions[4]['x-amz-credential']);
      form.append('x-amz-algorithm', response.data.s3_policy.conditions[5]['x-amz-algorithm']);
      form.append('x-amz-date', response.data.s3_policy.conditions[6]['x-amz-date']);
      form.append('policy', response.data.base64_policy);
      form.append('x-amz-signature', response.data.s3_signature);
      form.append('file', buffer);

      const uploadToAWSSettings = {
        async: true,
        crossDomain: true,
        url: response.data.host,
        method: 'POST',
        headers: {
          enctype: 'multipart/form-data',
          AccessControlAllowOrigin: '*',
          cacheControl: 'no-cache'
        },
        processData: false,
        contentType: false,
        mimeType: 'multipart/form-data',
        data: form
      };

      return axios.request(uploadToAWSSettings)
        .then(() => {
          const successForm = {
            key: response.data.key,
            isUserProfile
          };
          const successUploadSettings = {
            async: true,
            crossDomain: true,
            url: '/upload/image/success',
            method: 'POST',
            headers: {
              enctype: 'multipart/form-data',
              AccessControlAllowOrigin: '*',
              cacheControl: 'no-cache'
            },
            processData: false,
            contentType: false,
            mimeType: 'multipart/form-data',
            data: successForm
          };
          return nonActionApiWithJWT(successUploadSettings)
            .then(status => status);
        });
    });
}

export function nonActionApiWithJWT(config) {
  const token = loadToken();
  const configObject = config;

  if (!configObject.headers) {
    configObject.headers = {};
  }

  configObject.headers.Authorization = `${token}`;

  return axios.request(configObject)
    .then(res => res.data)
    .catch(error => error.response);
}

/*
* Local Storage functions
*/
export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';
export const USER_ID = 'user_id';

/**
 * Stores the provided access token in local storage.
 * @param {*} accessToken - The access token.
 */
export function setAccessToken(accessToken) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

/**
 * Stores the refresh token in local storage.
 * @param {string} refreshToken - The refresh token.
 */
export function setRefreshToken(refreshToken) {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
}

/**
 * Stores the user's ID in local storage.
 * @param {number} userId - The user's ID.
 */
export function setUserId(userId) {
  localStorage.setItem(USER_ID, userId);
}

export function getUserId() {
  return localStorage.getItem(USER_ID);
}

/**
 * Removes the access token, refresh token, and user ID from local storage.
 */
export function removeTokens() {
  localStorage.removeItem(USER_ID);
  localStorage.removeItem(ACCESS_TOKEN);
}

/**
 * Checks if the user's authentication is valid. If it isn't, clears current authentication
 * information from local storage.
 * @returns {Object} An object with type and hasValidToken properties.
 */
export function getAuth() {
  const checkToken = loadUserProfile();

  if (checkToken) {
    return {
      type: 'check_auth',
      hasValidToken: true
    };
  }

  removeTokens();

  return {
    type: 'check_auth',
    hasValidToken: false
  };
}

/**
 * Retrieves the access token from local storage.
 */
export function loadToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

/**
 * Retrieves the refresh token from local storage.
 */
export function loadRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN);
}

export function decodeUserProfile(accessToken) {
  try {
    return jwtDecode(accessToken);
  } catch (err) {
    return null;
  }
}

/**
 * Formats phone number
 */
export function normalizePhone(phone) {
  if (phone) {
    const normalizedPhone = phone.replace(/[^\d]/g, '');
    if (normalizedPhone.length === 10) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    }
  }

  return null;
}

/**
 * Loads the user profile from local storage.
 * @returns the user profile if a valid one was found, or null if it was not.
 */
export function loadUserProfile() {
  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    const userProfile = jwtDecode(accessToken);
    const now = new Date().getTime() / 1000; // Date().getTime() returns milliseconds.
    // So divide by 1000 to get seconds
    if (now > userProfile.exp) {
      // user profile has expired.
      removeTokens();
      return null;
    }
    return userProfile;
  } catch (err) {
    return null;
  }
}
