import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getQuestions } from 'utils/questions';

import './questions.css';

class Questions extends Component {
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
        questions: []
    };
  }

  componentWillMount() {
    getQuestions()
        .then(questions => {
            this.setState({
                questions
            })
        })
  }

  render() {
    return (
      <div className="questions"> 
        <h1>Questions</h1>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Questions);
