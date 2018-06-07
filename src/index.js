import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { createBrowserHistory } from 'history';
import registerServiceWorker from './registerServiceWorker';
// import our app components here
import configureStore from './store/configureStore';
import asyncLoader from './shared-components/asyncComponentLoader';
import './index.css';
import './styles/main.css';

const history = createBrowserHistory();
const store = configureStore();

// Create asyncLoader imports here
const asyncApp = asyncLoader(() => require('./containers/app/app'));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={asyncApp} />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
