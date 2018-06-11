import {
  REQUEST_PASSWORD_RESET_REQUEST,
  REQUEST_PASSWORD_RESET_SUCCESS,
  REQUEST_PASSWORD_RESET_FAILURE,
  SUBMIT_PASSWORD_RESET_REQUEST,
  SUBMIT_PASSWORD_RESET_SUCCESS,
  SUBMIT_PASSWORD_RESET_FAILURE
} from 'actions/password-reset';

export function requestPasswordReset(state = { response: {} }, action) {
  switch (action.type) {
    case REQUEST_PASSWORD_RESET_REQUEST:
      return Object.assign({}, state);
    case REQUEST_PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        response: action
      });
    case REQUEST_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        response: action
      };
    default:
      return state;
  }
}

export function submitPasswordReset(state = { response: {} }, action) {
  switch (action.type) {
    case SUBMIT_PASSWORD_RESET_REQUEST:
      return Object.assign({}, state);
    case SUBMIT_PASSWORD_RESET_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        response: action
      });
    case SUBMIT_PASSWORD_RESET_FAILURE:
      return {
        ...state,
        response: action
      };
    default:
      return state;
  }
}
