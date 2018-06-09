import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSchools } from 'utils/schools';
import { getUserInfo, saveUserInfo } from 'actions/user';

import Dropdown from 'react-dropdown';

import './profile.css';
import 'react-dropdown/style.css';

class Profile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      availableUniversities: [],
      email: '',
      gender: '',
      name: '',
      username: '',
      university: '',
      universityId: null
    };
  }

  componentWillMount() {
    this.props.dispatch(getUserInfo(this.props.auth.profile.id)).then(() => {
      let user = this.props.user.data;
      this.setState(user);

      getSchools().then(universities => {
        let availableUniversities = [];
        for (let i = 0; i < universities.length; i++) {
          availableUniversities.push({
            label: universities[i].name,
            value: universities[i].id
          });
          if (this.props.user.data.university === universities[i].id) {
            this.setState({
              university: universities[i].name
            });
          }
        }
        this.setState({
          availableUniversities
        });
      });
    });
  }

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  updateUniversity = university => {
    this.setState({
      universityId: university.value,
      university
    });
  };

  saveInfo = () => {
    let userInfo = {
      name: this.state.name,
      gender: this.state.gender,
      username: this.state.username,
      university: this.state.universityId
    };
    this.props.dispatch(saveUserInfo(userInfo));
  };

  render() {
    return (
      <div className="account">
        <h1>My Account</h1>
        <div className="account-container">
          <input
            className="account-container-input"
            id="name"
            onChange={this.updateState}
            placeholder="Name"
            value={this.state.name || ''}
          />
          <div className="row">
            <input
              className="account-container-input"
              disabled
              id="email"
              placeholder="Email"
              value={this.state.email || ''}
            />
            <h5
              className="account-container-info"
              style={this.state.emailVerified ? { color: '#2ADBA7' } : { color: 'red' }}
            >
              Email {this.state.emailVerified ? ' ' : ' not '}verified
            </h5>
          </div>
          <input
            className="account-container-input"
            id="gender"
            onChange={this.updateState}
            placeholder="Gender"
            value={this.state.gender || ''}
          />
          <input
            className="account-container-input"
            disabled
            id="username"
            placeholder="Username"
            value={this.state.username || ''}
          />
          <Dropdown
            className="account-container-dropdown"
            controlClassName="account-container-dropdown-control"
            id="university"
            menuClassName="account-container-dropdown-menu"
            onChange={this.updateUniversity}
            options={this.state.availableUniversities}
            placeholder="Select an option"
            value={this.state.university}
          />
          <button className="account-container-submitButton" onClick={this.saveInfo}>
            Save
          </button>
        </div>
      </div>
    );
  }
}

Profile.defaultProps = {
  user: null
};

Profile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

Profile.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps({ auth, user }) {
  return { auth, user };
}

export default connect(mapStateToProps)(Profile);
