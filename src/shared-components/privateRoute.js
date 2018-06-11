import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router'
import PropTypes from 'prop-types'

import { getAuth } from 'utils/api'
import { getUserInfo } from 'actions/user'

class PrivateRoute extends Component {
  componentWillMount() {
    this.authenticated = getAuth()
    if (this.authenticated.hasValidToken) {
      this.props.dispatch(getUserInfo())
    }
  }

  render() {
    const ChildComponent = this.props.component

    return (
      <Route
        {...this.props.rest}
        render={props =>
          this.authenticated.hasValidToken ? (
            <ChildComponent {...props} />
          ) : (
            <Redirect // eslint-disable-line
              to={{
                pathname: '/login',
                state: { from: props.location }, // eslint-disable-line react/prop-types
              }}
            />
          )
        }
      />
    )
  }
}

PrivateRoute.defaultProps = {
  rest: undefined,
  user: null,
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  rest: PropTypes.array,
  user: PropTypes.number,
}

PrivateRoute.contextTypes = {
  store: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
}

function mapStateToProps({ auth: { user, loginError } }) {
  if (user) {
    return { user: user.profile, loginError }
  }
  return { user: null }
}

export default connect(mapStateToProps)(PrivateRoute)
