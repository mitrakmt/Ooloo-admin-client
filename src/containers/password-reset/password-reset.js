import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';

import Request from './pages/request/request';
import Sent from './pages/sent/sent';
import SubmitPassword from './pages/submit-password/submit-password';

import './password-reset.css';

class PasswordReset extends Component {
  render() {
    return (
      <div className="passwordReset">
        <Switch>
          <Route path="/passwordreset/request" component={Request} />
          <Route path="/passwordreset/sent" component={Sent} />
          <Route path="/passwordreset/submit" component={SubmitPassword} />
        </Switch>
      </div>
    );
  }
}

PasswordReset.contextTypes = {
  location: PropTypes.object,
  router: PropTypes.object
};

PasswordReset.defaultProps = {
  location: {}
};

PasswordReset.propTypes = {
  location: PropTypes.object
};

export default PasswordReset;
