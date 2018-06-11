import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LoggedInHome from './components/loggedInHome/loggedInHome'
import LoggedOutHome from './components/loggedOutHome/loggedOutHome'

import './home.css'

class Home extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
  }

  render() {
    return <div className="home">{this.props.auth.profile ? <LoggedInHome /> : <LoggedOutHome />}</div>
  }
}

Home.defaultProps = {
  user: null,
}

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

Home.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Home)
