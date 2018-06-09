import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserInfo, saveUserInfo } from 'actions/user';
import { getSchools } from 'utils/schools';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'

import './profile.css';

class Profile extends Component {
  static defaultProps = {
    user: null
  }

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      email: '',
      gender: '',
      username: '',
      university: '',
      universityId: null,
      availableUniversities: []
    };
  }

  componentWillMount() {
    this.props.dispatch(getUserInfo(this.props.auth.profile.id))
      .then(() => {
        let user = this.props.user.data;
        this.setState(user)

        getSchools()
        .then(universities => {
          let availableUniversities = []
          for (let i = 0; i < universities.length; i++) {
            availableUniversities.push({
              label: universities[i].name,
              value: universities[i].id
            })
            if (this.props.user.data.university === universities[i].id) {
              this.setState({
                university: universities[i].name
              })
            }
          }
          this.setState({
            availableUniversities
          })
        })
      })
  }

  updateState = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  updateUniversity = (university) => {
    this.setState({
      universityId: university.value,
      university
    })
  }

  saveInfo = () => {
    let userInfo = {
      name: this.state.name,
      gender: this.state.gender,
      username: this.state.username,
      university: this.state.universityId
    }
    this.props.dispatch(saveUserInfo(userInfo))
  }

  render() {
    return (
      <div className="account">
        <h1>My Account</h1>
        <div className="account-container">
          <input className="account-container-input" id="name" placeholder="name" value={this.state.name || ''} onChange={this.updateState} />
          <div className="row">
            <input className="account-container-input" id="email" placeholder="email" value={this.state.email || ''} disabled />
            <h5 className="account-container-info" style={this.state.emailVerified ? {color: '#2ADBA7'} : {color: 'red'}}>Email { this.state.emailVerified ? ' ' : ' not '}verified</h5>
          </div>
          <input className="account-container-input" id="gender" placeholder="gender" value={this.state.gender || ''} onChange={this.updateState} />
          <input className="account-container-input" id="username" placeholder="username" value={this.state.username || ''} disabled />
          <Dropdown className="account-container-dropdown" options={this.state.availableUniversities} id="university" onChange={this.updateUniversity} value={this.state.university} controlClassName='account-container-dropdown-control' menuClassName='account-container-dropdown-menu' placeholder="Select an option" />
          <button className="account-container-submitButton" onClick={this.saveInfo}>Save</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, user }) {
  return { auth, user };
}

export default connect(mapStateToProps)(Profile);
