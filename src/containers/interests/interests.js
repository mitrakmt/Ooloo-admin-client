import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getInterests } from 'utils/interests';

import './interests.css';

class Interests extends Component {
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
        interests: []
    };
  }

  componentWillMount() {
    getInterests()
        .then(interests => {
            this.setState({
                interests
            })
        })
  }

  render() {
    return (
      <div className="interests"> 
        <h1>Interests</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Interests);
