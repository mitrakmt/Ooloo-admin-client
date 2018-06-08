import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getInterests, addInterest, deleteInterest } from 'utils/interests';

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
            interests: [],
            newInterest: '',
            showAddContainer: false
        };
    }

    componentWillMount() {
        this.getInterests()
    }

    getInterests = () => {
        getInterests()
            .then(interests => {
                this.setState({
                    interests,
                    newInterest: ''
                })
            })
    }

    addInterest = () => {
        let interest = this.state.newInterest
        if (!interest) {
            return;
        }
        addInterest(interest)
            .then(res => {
                if (res.error) {
                    return;
                }
                this.getInterests()
            })
    }

    deleteInterest = (id, index) => {
        // search through and remove in UI
        let originalInterests = this.state.interests
        let copied = this.state.interests.slice()
        copied.splice(index, 1)
        this.setState({
            interests: copied
        })
        deleteInterest(id)
            .then(res => {
                if (res.error) {
                    this.setState({
                        interests: originalInterests
                    })
                    return;
                }
            })
    }

    showAddContainer = () => {
        this.setState({
            showAddContainer: !this.state.showAddContainer
        })
    }

    updateState = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    /**
        * Key listener to login on 'enter'
     */
    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.addInterest()
        }
    }

    render() {
        return (
        <div className="interests">
            <div className="interests-container">
                <div className="interests-headerContainer">
                    <h1 className="interests-headerContainer-title">Interests</h1>
                </div>
                <div className="interests-addButtonContainer">
                    <h2 className="interests-addButtonContainer-icon" onClick={this.showAddContainer}>{ this.state.showAddContainer ? 'x' : '+' }</h2>
                </div>
            </div>
            {
                this.state.showAddContainer &&
                    <div className="interests-addContainer">
                        <input className="interests-addContainer-input" id="newInterest" onChange={this.updateState} value={this.state.newInterest} onKeyPress={this.handleKeyPress} />
                        <button className="interests-addContainer-button" onClick={this.addInterest}>Submit</button>
                    </div>
            }
            <div className="interests-listContainer">
                {
                    this.state.interests.map((interest, index) => (
                        <div className="interests-listContainer-interestContainer" key={`interestsList-${interest.id}${interest.name}`}>
                            <h3 className="interests-listContainer-interestContainer-name">{ interest.name }</h3>
                            <h3 className="interests-listContainer-interestContainer-delete" onClick={() => {this.deleteInterest(interest.id, index)}}>x</h3>
                        </div>
                    ))
                }
            </div>
        </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Interests);
