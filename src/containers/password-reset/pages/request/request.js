import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPasswordReset } from 'actions/password-reset';
// Direct path imports
import envelope from '../../../../images/envelope.png';
import './request.css';

class Request extends Component {
  static get propTypes() {
    return {
      dispatch: PropTypes.func.isRequired,
      history: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);

    this.inputChanged = this.inputChanged.bind(this);
    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);

    this.state = {
      email: '',
      sentRecoveryEmail: false,
      errorDialogOpen: false,
      errorFields: {}
    };
  }

  /**
   * Putting this into an object here to keep the param list short. Should also
   * perform any stripping of empty data or other modifications/final checks on user input
   * here.
   */
  objectifyFormData() {
    const { email } = this.state;
    const formData = {
      email
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
  }

  handleEmailSubmit() {
    this.props.dispatch(requestPasswordReset(this.state.email))
      .then((status) => {
        if (status.response.status === 'success') {
          this.props.history.push({
            pathname: '/en/passwordreset/sent',
            state: {
              email: this.state.email
            }
          });
        }
      });
  }

  render() {
    return (
      <div className="column requestContainer">
        <div className="requestContainer-parent align-center text-center row">
          <div className="requestContainer-formContainer small-9 medium-6 large-centered column">
            <img src={envelope} alt="key" />
            <div>
              <h4 className="requestContainer-formContainer-header">PASSWORD HELP</h4>
              <p className="requestContainer-formContainer-subHeader">Enter the email associated with your Esports Arena account, then click Continue.  We will email you a link to a secret level where you can summon a new password.</p>
            </div>
            <div>
              <input
                id="email"
                className="requestContainer-input-text"
                floatingLabelText="Email"
                onBlur={this.inputChanged}
                style={{ width: '300px' }}
              />
              <button
                label="Continue"
                onClick={this.handleEmailSubmit}
                secondary={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return { user: null };
}

export default connect(mapStateToProps)(Request);
