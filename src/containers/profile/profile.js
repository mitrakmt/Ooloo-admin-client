import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserInfo, saveUserInfo } from 'actions/user';

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
      university: ''
    };
  }

  componentWillMount() {
    this.props.dispatch(getUserInfo(this.props.auth.profile.id))
      .then(status => {
        let user = this.props.user.data;
        this.setState(user)
      })
  }

  updateState = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  saveInfo = () => {
    let userInfo = {
      name: this.state.name,
      gender: this.state.gender,
      username: this.state.username,
      university: this.state.university
    }
    this.props.dispatch(saveUserInfo(userInfo))
  }

  render() {
    return (
      <div className="account">
        <h1>My Account</h1>
        <div className="account-container">
          <input className="account-container-input" id="name" placeholder="name" value={this.state.name || ''} onChange={this.updateState} />
          <input className="account-container-input" id="email" placeholder="email" value={this.state.email || ''} disabled />
          <input className="account-container-input" id="gender" placeholder="gender" value={this.state.gender || ''} onChange={this.updateState} />
          <input className="account-container-input" id="username" placeholder="username" value={this.state.username || ''} disabled />
          <input className="account-container-input" id="university" placeholder="university" value={this.state.university || ''} onChange={this.updateState} />
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
