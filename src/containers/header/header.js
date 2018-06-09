import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { clearUserInfo } from 'actions/user';
import { logout } from 'actions/auth';

import './header.css';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  logout = () => {
    this.props.dispatch(clearUserInfo());
    this.props.dispatch(logout()).then(() => {
      this.context.router.history.push('/');
    });
  };

  render() {
    return (
      <div className="header" role="navigation">
        <div className="header-navLinks">
          <Link to={'/'}>
            <p className="header-navLinks-text">Home</p>
          </Link>
          {this.props.auth.profile && (
            <div className="header-navLinks-row">
              <Link to={'/interests'}>
                <p className="header-navLinks-text">Interests</p>
              </Link>
            </div>
          )}
          {this.props.auth.profile && (
            <div className="header-navLinks-row">
              <Link to={'/schools'}>
                <p className="header-navLinks-text">Schools</p>
              </Link>
            </div>
          )}
          {this.props.auth.profile && (
            <div className="header-navLinks-row">
              <Link to={'/questions'}>
                <p className="header-navLinks-text">Questions</p>
              </Link>
            </div>
          )}
          {this.props.auth.profile && (
            <div className="header-navLinks-row">
              <Link to={'/admins'}>
                <p className="header-navLinks-text">Admins</p>
              </Link>
            </div>
          )}
        </div>
        <div className="header-authActions">
          {this.props.auth.profile ? (
            <div className="header-navLinks-row">
              <Link to={'/account'}>
                <p className="header-navLinks-text">My Account</p>
              </Link>
              <p className="header-navLinks-text" onClick={this.logout}>
                Logout
              </p>
            </div>
          ) : (
            <div className="header-navLinks-row">
              <Link to={'/login'}>
                <p className="header-navLinks-text">Login</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  location: {}
};

Header.propTypes = {
  location: PropTypes.object
};

Header.contextTypes = {
  location: PropTypes.object,
  router: PropTypes.object
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Header);
