import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { requestPasswordReset } from 'actions/password-reset'

import envelope from 'images/envelope.png'

import './sent.css'

class Sent extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      resetAlert: false,
    }
  }

  componentDidMount() {
    if (this.props.history.location.state.email === undefined) {
      this.props.history.push({
        pathname: '/passwordreset/request',
        state: {
          error: 'no email provided',
        },
      })
    }
  }

  handleEmailSubmit = () => {
    this.props.dispatch(requestPasswordReset(this.props.history.location.state.email)).then(status => {
      if (status.response.status === 400) {
        this.props.history.push({
          pathname: '/passwordreset/request',
          state: {
            error: 'Please resend a new password reset email and try again',
            status: 400,
          },
        })
        return
      }
      this.setState({
        resetAlert: true,
      })
      setTimeout(() => {
        this.setState({
          resetAlert: false,
        })
      }, 4000)
    })
  }

  render() {
    return (
      <div className="column sentPasswordContainer">
        <div className="text-center row">
          <div className="sentPasswordContainer-formContainer">
            <img src={envelope} alt="key" />
            <div className="column">
              <h1 className="sentPasswordContainer-formContainer-header">EMAIL SENT</h1>
              <p className="sentPasswordContainer-formContainer-subHeader">
                Please click the password reset link in the email we sent you.
              </p>
            </div>
            <div className="sentPasswordContainer-link column">
              {!this.state.resetAlert && (
                <p className="resend-text-button">
                  <a onClick={this.handleEmailSubmit} role="button" tabIndex="0">
                    Resend password recovery email
                  </a>
                </p>
              )}
              {this.state.resetAlert && <p className="color-positive">Email resent successfully</p>}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Sent.defaultProps = {
  location: {
    pathname: '',
  },
}

Sent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
}

function mapStateToProps() {
  return { user: null }
}

export default connect(mapStateToProps)(Sent)
