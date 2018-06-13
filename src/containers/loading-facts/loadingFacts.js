import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getLoadingFacts, addLoadingFact, deleteLoadingFact } from 'utils/loadingFacts'

import ListTitle from 'shared-components/list-title/listTitle'

import './loadingFacts.css'

class LoadingFacts extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      loadingFacts: [],
      newLoadingFact: '',
      showAddContainerStatus: false,
    }
  }

  componentWillMount() {
    this.getLoadingFacts()
  }

  getLoadingFacts = () => {
    // imported util to getLoadingFacts
    getLoadingFacts().then(loadingFacts => {
      this.setState({
        loadingFacts,
        newLoadingFact: '',
      })
    })
  }

  addLoadingFact = () => {
    let loadingFact = this.state.newLoadingFact
    if (!loadingFact) {
      return
    }
    // imported util to addLoadingFact
    addLoadingFact(loadingFact).then(res => {
      if (res.error) {
        return
      }
      this.getLoadingFacts()
    })
  }

  deleteLoadingFact = (id, index) => {
    // search through and remove in UI for quick UI
    let originalLoadingFacts = this.state.loadingFacts
    let copied = this.state.loadingFacts.slice()
    copied.splice(index, 1)
    this.setState({
      loadingFacts: copied,
    })
    // imported util to deleteLoadingFact
    deleteLoadingFact(id).then(res => {
      if (res.error) {
        this.setState({
          loadingFacts: originalLoadingFacts,
        })
        return
      }
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
      this.addLoadingFact()
    }
  }

  render() {
    return (
      <div className="loadingFacts">
        <ListTitle
          showAddContainer={this.showAddContainer}
          showAddContainerStatus={this.state.showAddContainerStatus}
          title="Loading Facts"
        />
        {this.state.showAddContainerStatus && (
          <div className="loadingFacts-addContainer">
            <input
              className="loadingFacts-addContainer-input"
              id="newLoadingFact"
              onChange={this.updateState}
              onKeyPress={this.handleKeyPress}
              value={this.state.newLoadingFact}
            />
            <button className="loadingFacts-addContainer-button" onClick={this.addLoadingFact}>
              Submit
            </button>
          </div>
        )}
        <div className="loadingFacts-listContainer">
          {this.state.loadingFacts.map((loadingFact, index) => (
            <div
              className="loadingFacts-listContainer-loadingFactContainer"
              key={`loadingFactsList-${loadingFact.id}${loadingFact.fact}`}
            >
              <h3 className="loadingFacts-listContainer-loadingFactContainer-name">{loadingFact.fact}</h3>
              <h3
                className="loadingFacts-listContainer-loadingFactContainer-delete"
                onClick={() => {
                  this.deleteLoadingFact(loadingFact.id, index)
                }}
              >
                x
              </h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

LoadingFacts.defaultProps = {
  user: null,
}

LoadingFacts.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

LoadingFacts.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(LoadingFacts)
