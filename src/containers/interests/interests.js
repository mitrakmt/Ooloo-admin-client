import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getInterests, addInterest, deleteInterest } from 'utils/interests';

import ListTitle from 'shared-components/list-title/listTitle';

import './interests.css';

class Interests extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      interests: [],
      newInterest: '',
      showAddContainerStatus: false
    };
  }

  componentWillMount() {
    this.getInterests();
  }

  getInterests = () => {
    getInterests().then(interests => {
      this.setState({
        interests,
        newInterest: ''
      });
    });
  };

  addInterest = () => {
    let interest = this.state.newInterest;
    if (!interest) {
      return;
    }
    addInterest(interest).then(res => {
      if (res.error) {
        return;
      }
      this.getInterests();
    });
  };

  deleteInterest = (id, index) => {
    // search through and remove in UI for quick UI
    let originalInterests = this.state.interests;
    let copied = this.state.interests.slice();
    copied.splice(index, 1);
    this.setState({
      interests: copied
    });
    deleteInterest(id).then(res => {
      if (res.error) {
        this.setState({
          interests: originalInterests
        });
        return;
      }
    });
  };

  showAddContainer = () => {
    this.setState({
      showAddContainerStatus: !this.state.showAddContainerStatus
    });
  };

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addInterest();
    }
  };

  render() {
    return (
      <div className="interests">
        <ListTitle
          showAddContainer={this.showAddContainer}
          showAddContainerStatus={this.state.showAddContainerStatus}
          title="Interests"
        />
        {this.state.showAddContainerStatus && (
          <div className="interests-addContainer">
            <input
              className="interests-addContainer-input"
              id="newInterest"
              onChange={this.updateState}
              onKeyPress={this.handleKeyPress}
              value={this.state.newInterest}
            />
            <button className="interests-addContainer-button" onClick={this.addInterest}>
              Submit
            </button>
          </div>
        )}
        <div className="interests-listContainer">
          {this.state.interests.map((interest, index) => (
            <div
              className="interests-listContainer-interestContainer"
              key={`interestsList-${interest.id}${interest.name}`}
            >
              <h3 className="interests-listContainer-interestContainer-name">{interest.name}</h3>
              <h3
                className="interests-listContainer-interestContainer-delete"
                onClick={() => {
                  this.deleteInterest(interest.id, index);
                }}
              >
                x
              </h3>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Interests.defaultProps = {
  user: null
};

Interests.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

Interests.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Interests);
