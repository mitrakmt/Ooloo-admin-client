import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router';

import asyncLoader from 'shared-components/asyncComponentLoader';
import PrivateRoute from 'shared-components/privateRoute';
// import { refreshLogin } from 'actions/auth';
import _isEqual from 'lodash/isEqual';

import { getUserInfo } from 'actions/user';
import { getAuth } from 'utils/api';

// Relative imports
import Header from '../header/header';

import './app.css';

const asyncLogin = asyncLoader(() => require('../../containers/login/login'));
const asyncPasswordReset = asyncLoader(() => require('../../containers/password-reset/password-reset'));
const asyncProfile = asyncLoader(() => require('../../containers/profile/profile'));
const asyncEmailValidation = asyncLoader(() => require('../../containers/email-validation/emailValidation'));
const asyncHome = asyncLoader(() => require('../../containers/home/home'));
const asyncAdmins = asyncLoader(() => require('../../containers/admins/admins'));
const asyncSchools = asyncLoader(() => require('../../containers/schools/schools'));
const asyncQuestions = asyncLoader(() => require('../../containers/questions/questions'));
const asyncInterests = asyncLoader(() => require('../../containers/interests/interests'));

class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  }

  static contextTypes = {
    history: PropTypes.object,
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    getAuth()
    if (this.props.auth.profile)  {
      this.props.dispatch(getUserInfo())
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-container">
          <Switch>
            <Route exact path="/" component={asyncHome} />
            <Route path="/emailvalidation/:token" component={asyncEmailValidation} />
            <Route path="/login" component={asyncLogin} location={this.props.location} />
            <Route path="/passwordreset" component={asyncPasswordReset} />
            <PrivateRoute path="/account" component={asyncProfile} />
            <PrivateRoute path="/admins" component={asyncAdmins} />
            <PrivateRoute path="/schools" component={asyncSchools} />
            <PrivateRoute path="/questions" component={asyncQuestions} />
            <PrivateRoute path="/interests" component={asyncInterests} />
            <Route component={asyncHome} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user };
};

export default connect(mapStateToProps)(App);
