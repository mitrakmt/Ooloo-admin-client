import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
// Reducers
import auth from '../reducers/auth';
import user from '../reducers/user';
import { requestPasswordReset, submitPasswordReset } from '../reducers/password-reset';

// const logger = createLogger();
/**
 * @var {function} rootReducer - The result of the combineReducers helper function,
 * which turns an object whose values are different reducing functions into a single reducing
 * function you can pass to createStore.
 */
const rootReducer = combineReducers({
  auth,
  user,
  requestPasswordReset,
  submitPasswordReset,
});
const initialState = {};

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === 'function') {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

/**
 * Takes the root reducer and initial state, and works
 * with thunk to compose the store.
 */
export default function configureStore() {
  let store;

  if (module.hot) {
    store = createStore(
      rootReducer,
      initialState,
      compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    );
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
}
