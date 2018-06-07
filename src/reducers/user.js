import {
    CLEAR_USER,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILURE
  } from '../actions/user';
  
  export default function user(state = { data: {} }, action) {
    switch (action.type) {
      case POST_USER_REQUEST:
        return Object.assign({}, state);
      case POST_USER_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          data: action.user
        });
      case POST_USER_FAILURE:
        return {
          ...state,
          data: action
        };
      case CLEAR_USER:
        return {
          ...state,
          data: {}
        };
      default:
        return state;
    }
  }
  