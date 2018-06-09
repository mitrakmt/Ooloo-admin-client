import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSchools, addSchool, deleteSchool } from 'utils/schools';

import ListTitle from 'shared-components/list-title/listTitle';
import SelectUSState from 'react-select-us-states';

import './schools.css';

class Schools extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      degree: '',
      name: '',
      schools: [],
      showAddContainerStatus: false,
      state: 'Alabama'
    };
  }

  componentWillMount() {
    getSchools().then(schools => {
      this.setState({
        schools
      });
    });
  }

  getSchools = () => {
    getSchools().then(schools => {
      this.setState({
        degree: '',
        name: '',
        schools
      });
    });
  };

  addSchool = () => {
    let degree = this.state.degree;
    let name = this.state.name;
    let state = this.state.state;
    if (!name || !state || !degree) {
      return;
    }
    addSchool(name, state, degree).then(res => {
      if (res.error) {
        return;
      }
      this.getSchools();
    });
  };

  deleteSchool = (id, index) => {
    let original = this.state.schools;
    let copied = this.state.schools.slice();
    copied.splice(index, 1);
    this.setState({
      schools: copied
    });
    deleteSchool(id).then(res => {
      if (res.error) {
        this.setState({
          schools: original
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

  changeUsState = name => {
    this.setState({
      state: name
    });
  };

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addSchool();
    }
  };

  render() {
    return (
      <div className="schools">
        <ListTitle
          showAddContainer={this.showAddContainer}
          showAddContainerStatus={this.state.showAddContainerStatus}
          title="Schools"
        />
        {this.state.showAddContainerStatus && (
          <div className="schools-addContainer">
            <div className="column">
              <input
                className="schools-addContainer-input"
                id="name"
                onChange={this.updateState}
                placeholder="School Name"
                value={this.state.name}
              />
              <SelectUSState
                className="schools-addContainer-stateDropdown"
                id="stateSelection"
                onChange={this.changeUsState}
              />
              <input
                className="schools-addContainer-input"
                id="degree"
                onChange={this.updateState}
                onKeyPress={this.handleKeyPress}
                placeholder="Degree Type"
                value={this.state.degree}
              />
            </div>
            <button className="schools-addContainer-button" onClick={this.addSchool}>
              Submit
            </button>
          </div>
        )}
        <div className="schools-listContainer">
          {this.state.schools.map((school, index) => (
            <div className="schools-listContainer-schoolContainer" key={`schoolsList-${school.id}${school.name}`}>
              <div>
                <h3 className="schools-listContainer-schoolContainer-name">{school.name}</h3>
                <div className="row">
                  <p className="schools-listContainer-schoolContainer-info">{school.state}</p>
                  <p className="schools-listContainer-schoolContainer-info">{school.degree}</p>
                </div>
              </div>
              <h3
                className="schools-listContainer-schoolContainer-delete"
                onClick={() => {
                  this.deleteSchool(school.id, index);
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

Schools.defaultProps = {
  user: null
};

Schools.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

Schools.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Schools);
