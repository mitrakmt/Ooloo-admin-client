import { callApi } from "../utils/api";

export const REQUEST_PASSWORD_RESET_REQUEST = "REQUEST_PASSWORD_RESET_REQUEST";
export const REQUEST_PASSWORD_RESET_SUCCESS = "REQUEST_PASSWORD_RESET_SUCCESS";
export const REQUEST_PASSWORD_RESET_FAILURE = "REQUEST_PASSWORD_RESET_FAILURE";
export const SUBMIT_PASSWORD_RESET_REQUEST = "SUBMIT_PASSWORD_RESET_REQUEST";
export const SUBMIT_PASSWORD_RESET_SUCCESS = "SUBMIT_PASSWORD_RESET_SUCCESS";
export const SUBMIT_PASSWORD_RESET_FAILURE = "SUBMIT_PASSWORD_RESET_FAILURE";

function requestPasswordResetFailure(response) {
  return {
    response,
    type: REQUEST_PASSWORD_RESET_FAILURE
  };
}

function requestPasswordResetRequest(response) {
  return {
    type: REQUEST_PASSWORD_RESET_REQUEST,
    response
  };
}

function requestPasswordResetSuccess(response) {
  return {
    response,
    type: REQUEST_PASSWORD_RESET_SUCCESS
  };
}

export function requestPasswordReset(email) {
  const url = `/cp/auth/passwordreset?email=${email}`;
  const config = {
    url,
    method: "get",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  };

  return callApi(
    config,
    requestPasswordResetRequest,
    requestPasswordResetSuccess,
    requestPasswordResetFailure
  );
}

function submitPasswordResetFailure(response) {
  return {
    response,
    type: SUBMIT_PASSWORD_RESET_FAILURE
  };
}

function submitPasswordResetRequest(response) {
  return {
    type: SUBMIT_PASSWORD_RESET_REQUEST,
    response
  };
}

function submitPasswordResetSuccess(response) {
  return {
    response,
    type: SUBMIT_PASSWORD_RESET_SUCCESS
  };
}

export function submitPasswordReset(new_password, reset_token) {
  const config = {
    url: "/cp/auth/passwordreset",
    method: "post",
    header: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    data: {
      new_password,
      reset_token
    }
  };

  return callApi(
    config,
    submitPasswordResetRequest,
    submitPasswordResetSuccess,
    submitPasswordResetFailure
  );
}
