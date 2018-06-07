import React, { Component } from 'react';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import { isSafari } from 'utils/browserDetector';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { submitPasswordReset } from 'actions/password-reset';
// Direct path imports
import key from '../../../../images/key.png';
import './submit-password.css';

const styles = {
  block: {
    maxWidth: 250
  },
  container: {
    textAlign: 'center',
    width: '100%'
  }
};

class SubmitPassword extends Component {
  static get defaultProps() {
    return {
      location: {
        pathname: '',
      },
    };
  }

  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string
      }),
      history: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);

    this.inputChanged = this.inputChanged.bind(this);
    this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

    this.state = {
      password: '',
      invalidTokenError: false,
      passwordTypeValidation: false,
      passwordLengthValidation: false
    };
  }

  /**
   * Putting this into an object here to keep the param list short. Should also
   * perform any stripping of empty data or other modifications/final checks on user input
   * here.
   */
  objectifyFormData() {
    const { password } = this.state;
    const formData = {
      password
    };
    return formData;
  }

  updateLocalState = () => {

  }

  /**
   * Updates the local state of Login Component.
  */
  inputChanged(event) {
    this.updateLocalState(event, this);
    const password = event.target.value;
    const uppercaseRegex = password.match(/[A-Z]/g);
    const lowercaseRegex = password.match(/[a-z]/g);
    const symbolRegex = password.match(/[!@#$%^&*()]/g);
    const numberRegex = password.match(/[0-9]/g);

    if (password.length >= 8) {
      this.setState({
        passwordLengthValidation: true
      });
    } else {
      this.setState({
        passwordLengthValidation: false
      });
    }

    if (uppercaseRegex === null || lowercaseRegex === null || (symbolRegex === null && numberRegex === null)) {
      this.setState({
        passwordTypeValidation: false
      });
      return;
    }
    this.setState({
      passwordTypeValidation: true
    });
  }

  handlePasswordSubmit() {
    const parsed = queryString.parse(this.props.location.search);

    if (this.state.passwordTypeValidation === false || this.state.passwordLengthValidation === false) {
      return;
    }

    this.props.dispatch(submitPasswordReset(this.state.password, parsed.t))
      .then((status) => {
        if (status.response.status === 'success') {
          this.props.history.push('/en/login');
        } else {
          this.setState({
            invalidTokenError: true
          });
        }
      });
  }

  render() {
    return (
      <div className="column submitPasswordContainer">
          <div style={styles.container} className="row align-center">
            <div className="submitPasswordContainer-formContainer medium-12 large-centered column">
              <img src={key} alt="key" />
              <h1 className="submitPasswordContainer-formContainer-header">RESET PASSWORD</h1>
              <input
                id="password"
                className="submitPasswordContainer-input-text"
                floatingLabelText="New Password"
                type="password"
                onChange={this.inputChanged}
                readOnly
                autoFocus
              />
              <div className="submitPasswordContainer-formContainer-password-validators row">
                <div className="small-centered column submitPasswordContainer-formContainer-password-validators-container" style={isSafari() ? { marginTop: '20px' } : {}}>
                  <div className="row">
                    <FontAwesome
                      className={this.state.passwordLengthValidation ? 'color-positive icon' : 'color-warning icon'}
                      name={this.state.passwordLengthValidation ? 'check-circle' : 'times-circle'}
                      style={{ fontSize: '12px' }}
                    />
                    <p className="submitPasswordContainer-formContainer-password-validators-container-requirements"> Length 8+ characters</p>
                  </div>
                  <div className="row">
                    <FontAwesome
                      className={this.state.passwordTypeValidation ? 'color-positive icon' : 'color-warning icon'}
                      name={this.state.passwordTypeValidation ? 'check-circle' : 'times-circle'}
                      style={{ fontSize: '12px' }}
                    />
                    <p className="submitPasswordContainer-formContainer-password-validators-container-requirements"> Upper & lower + numeric or special character</p>
                  </div>
                </div>
              </div>
              {
                this.state.invalidTokenError &&
                <p className="color-warning">The password reset link you are using is no longer valid. Please request a new one.</p>
              }
              <button
                className={`submitPasswordContainer-formContainer-submitButton ${this.state.passwordTypeValidation && this.state.passwordLengthValidation && 'submitPasswordContainer-formContainer-submitButton-show'}`}
                label={'Continue'}
                onClick={this.handlePasswordSubmit}
                secondary={false}
              />
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return { user: null };
}

export default connect(mapStateToProps)(SubmitPassword);
