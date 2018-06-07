import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { requestPasswordReset } from 'actions/password-reset';
// Direct path imports
import envelope from '../../../../images/envelope.png';
import './sent.css';

const styles = {
  block: {
    maxWidth: 250
  },
  container: {
    textAlign: 'center',
    width: '100%'
  }
};

class Sent extends Component {
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
        pathname: PropTypes.string.isRequired
      }),
      history: PropTypes.object.isRequired
    };
  }

  constructor(props, context) {
    super(props, context);

    this.handleEmailSubmit = this.handleEmailSubmit.bind(this);

    this.state = {
      resetAlert: false
    };
  }

  componentDidMount() {
    if (this.props.history.location.state.email === undefined) {
      this.props.history.push({
        pathname: '/en/passwordreset/request',
        state: {
          error: 'no email provided'
        }
      });
    }
  }

  handleEmailSubmit() {
    this.props.dispatch(requestPasswordReset(this.props.history.location.state.email))
      .then((status) => {
        if (status.response.status === 400) {
          this.props.history.push({
            pathname: '/en/passwordreset/request',
            state: {
              error: 'Please resend a new password reset email and try again',
              status: 400
            }
          });
          return;
        }
        this.setState({
          resetAlert: true
        });
        setTimeout(() => {
          this.setState({
            resetAlert: false
          });
        }, 4000);
      });
  }

  render() {
    return (
      <div className="column sentPasswordContainer">
        <div style={styles.container} className="align-center text-center row">
          <div className="sentPasswordContainer-formContainer small-8 align-center">
            <img src={envelope} alt="key" />
            <div className="column">
              <h1 className="sentPasswordContainer-formContainer-header">EMAIL SENT</h1>
              <p className="sentPasswordContainer-formContainer-subHeader">Please click the password reset link in the email we sent you.</p>
            </div>
            <div className="sentPasswordContainer-link column">
              {
                !this.state.resetAlert &&
                <p className="resend-text-button"><a onClick={this.handleEmailSubmit} role="button" tabIndex="0">Resend password recovery email</a></p>
              }
              {
                this.state.resetAlert &&
                <p className="color-positive">Email resent successfully</p>
              }
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

export default connect(mapStateToProps)(Sent);
