import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getAdmins, addAdmin } from 'utils/admins'

import ListTitle from 'shared-components/list-title/listTitle'

import AdminForm from './components/adminForm/adminForm'

import './admins.css'

class Admins extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      admins: [],
      email: '',
      username: '',
      password: '',
      adminPassword: '',
    }
  }

  componentWillMount() {
    getAdmins().then(admins => {
      this.setState({
        admins,
      })
    })
  }

  getAdmins = () => {
    getAdmins().then(admins => {
      this.setState({
        admins,
        email: '',
        password: '',
        username: '',
        adminPassword: '',
      })
    })
  }

  addAdmin = () => {
    let username = this.state.username
    let email = this.state.email
    let password = this.state.password
    let adminPassword = this.state.adminPassword

    if (!email || !username || !password || !adminPassword) {
      // TODO: show visual error
      return
    }
    addAdmin(email, username, password, adminPassword).then(res => {
      if (res.error) {
        return
      }
      this.getAdmins()
    })
  }

  showAddContainer = () => {
    this.setState({
      showAddContainerStatus: !this.state.showAddContainerStatus,
    })
  }

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addSchool()
    }
  }

  render() {
    return (
      <div className="admins">
        <ListTitle
          showAddContainer={this.showAddContainer}
          showAddContainerStatus={this.state.showAddContainerStatus}
          title="Admins"
        />
        {this.state.showAddContainerStatus && (
          <AdminForm
            username={this.state.username}
            email={this.state.email}
            password={this.state.password}
            adminPassword={this.state.adminPassword}
            handleKeyPress={this.handleKeyPress}
            updateState={this.updateState}
            addAdmin={this.addAdmin}
          />
        )}
        <div className="admins-listContainer">
          {this.state.admins.map(admin => (
            <div className="admins-listContainer-adminContainer" key={`adminsList-${admin.id}${admin.email}`}>
              <div>
                <h3 className="admins-listContainer-adminContainer-name">{admin.email}</h3>
                <div className="row">
                  <p className="admins-listContainer-adminContainer-info">{admin.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

Admins.defaultProps = {
  user: null,
}

Admins.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

Admins.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Admins)
