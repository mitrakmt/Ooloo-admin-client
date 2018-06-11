import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { requestPasswordReset } from 'actions/password-reset'

import envelope from 'images/envelope.png'

import './request.css'

class Request extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      email: '',
      errorDialogOpen: false,
      errorFields: {},
      sentRecoveryEmail: false,
    }
  }

  /**
   * Perform any stripping of empty data or other modifications/final checks on user input
   * here.
   */
  objectifyFormData() {
    const { email } = this.state
    const formData = {
      email,
    }
    return formData
  }

  /**
   * Updates the local state of Login Component.
   */
  inputChanged = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  handleEmailSubmit = () => {
    this.props.dispatch(requestPasswordReset(this.state.email)).then(status => {
      if (status.response.status === 'success') {
        this.props.history.push({
          pathname: '/passwordreset/sent',
          state: {
            email: this.state.email,
          },
        })
      }
    })
  }

  render() {
    return (
      <div className="column requestContainer">
        <div className="requestContainer-parent text-center row">
          <div className="requestContainer-formContainer column">
            <img src={envelope} alt="envelope" />
            <div>
              <h4 className="requestContainer-formContainer-header">PASSWORD HELP</h4>
              <p className="requestContainer-formContainer-subHeader">
                Enter the email associated with your Esports Arena account, then click Continue. We will email you a
                link to a secret level where you can summon a new password.
              </p>
            </div>
            <div>
              <input
                id="email"
                className="requestContainer-input-text"
                floatingLabelText="Email"
                onBlur={this.inputChanged}
              />
              <button label="Continue" onClick={this.handleEmailSubmit} secondary={false} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Request.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}

function mapStateToProps() {
  return { user: null }
}

export default connect(mapStateToProps)(Request)
