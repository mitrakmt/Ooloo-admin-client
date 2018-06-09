import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { validateEmail } from 'utils/emailValidation';

import './emailValidation.css';

class EmailValidation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      emailVerified: false,
      verifying: true,
      error: '',
      verificationError: false
    };
  }

  componentWillMount = () => {
    let token = this.props.match.params.token;
    this.setState({
      token
    });
    validateEmail(token).then(response => {
      if (response.emailVerified) {
        this.setState({
          emailVerified: true,
          verifying: false
        });
      } else {
        this.setState({
          verificationError: true,
          error: response.error
        });
      }
    });
  };

  render() {
    return (
      <div className="emailValidation">
        <h1>Email Validation</h1>
        {this.state.verifying && <p>Verifying... be patient</p>}
        {this.state.emailVerified && <p>Email Verified</p>}
      </div>
    );
  }
}

EmailValidation.defaultProps = {
  location: {}
};

EmailValidation.propTypes = {
  location: PropTypes.object
};

EmailValidation.contextTypes = {
  location: PropTypes.object,
  router: PropTypes.object
};

export default EmailValidation;
