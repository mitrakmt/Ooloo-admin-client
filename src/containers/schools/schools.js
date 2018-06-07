import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSchools } from 'utils/schools';

import './schools.css';

class Schools extends Component {
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
        schools: []
    };
  }

  componentWillMount() {
    getSchools()
        .then(schools => {
            this.setState({
                schools
            })
        })
  }

  render() {
    return (
      <div className="schools"> 
        <h1>Schools</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Schools);
