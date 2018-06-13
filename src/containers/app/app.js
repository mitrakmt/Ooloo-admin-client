import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router'

import { getUserInfo } from 'actions/user'
import { getAuth } from 'utils/api'
import asyncLoader from 'shared-components/asyncComponentLoader'
import PrivateRoute from 'shared-components/privateRoute'

import Header from 'containers/header/header'

import './app.css'

const asyncLogin = asyncLoader(() => require('../../containers/login/login'))
const asyncPasswordReset = asyncLoader(() => require('../../containers/password-reset/password-reset'))
const asyncProfile = asyncLoader(() => require('../../containers/profile/profile'))
const asyncEmailValidation = asyncLoader(() => require('../../containers/email-validation/emailValidation'))
const asyncHome = asyncLoader(() => require('../../containers/home/home'))
const asyncAdmins = asyncLoader(() => require('../../containers/admins/admins'))
const asyncSchools = asyncLoader(() => require('../../containers/schools/schools'))
const asyncQuestions = asyncLoader(() => require('../../containers/questions/questions'))
const asyncInterests = asyncLoader(() => require('../../containers/interests/interests'))
const asyncLoadingFacts = asyncLoader(() => require('../../containers/loading-facts/loadingFacts'))

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentWillMount() {
    getAuth()
    if (this.props.auth.profile) {
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
            <Route path="/emailverification/:token" component={asyncEmailValidation} />
            <Route path="/login" component={asyncLogin} location={this.props.location} />
            <Route path="/passwordreset" component={asyncPasswordReset} />
            <PrivateRoute path="/account" component={asyncProfile} />
            <PrivateRoute path="/admins" component={asyncAdmins} />
            <PrivateRoute path="/schools" component={asyncSchools} />
            <PrivateRoute path="/questions" component={asyncQuestions} />
            <PrivateRoute path="/interests" component={asyncInterests} />
            <PrivateRoute path="/loadingFacts" component={asyncLoadingFacts} />
            <Route component={asyncHome} />
          </Switch>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

App.contextTypes = {
  history: PropTypes.object,
  router: PropTypes.object,
}

const mapStateToProps = ({ auth, user }) => {
  return { auth, user }
}

export default connect(mapStateToProps)(App)
