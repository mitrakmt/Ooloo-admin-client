import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAdmins, addAdmin } from 'utils/admins';

import ListTitle from 'shared-components/list-title/listTitle';

import './admins.css';

class Admins extends Component {
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
            admins: [],
            email: '',
            username: '',
            password: '',
            adminPassword: ''
        };
    }

    componentWillMount() {
        getAdmins()
            .then(admins => {
                this.setState({
                    admins
                })
            })
    }

    getAdmins = () => {
        getAdmins()
            .then(admins => {
                this.setState({
                    admins,
                    email: '',
                    password: '',
                    username: '',
                    adminPassword: ''
                })
            })
    }

    addAdmin = () => {
        let username = this.state.username
        let email = this.state.email
        let password = this.state.password
        let adminPassword = this.state.adminPassword

        if (!email || !username || !password || !adminPassword) {
            return;
        }
        addAdmin(email, username, password, adminPassword)
            .then(res => {
                if (res.error) {
                    return;
                }
                this.getAdmins()
            })
    }

    showAddContainer = () => {
        this.setState({
            showAddContainerStatus: !this.state.showAddContainerStatus
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
            this.addSchool()
        }
    }

    render() {
        return (
            <div className="admins">
                <ListTitle showAddContainer={this.showAddContainer} showAddContainerStatus={this.state.showAddContainerStatus} title="Admins" />
                {
                    this.state.showAddContainerStatus &&
                        <div className="admins-addContainer">
                            <div className="column">
                                <input className="admins-addContainer-input" placeholder="Username" id="username" onChange={this.updateState} value={this.state.username} />
                                <input className="admins-addContainer-input" placeholder="Email" id="email" onChange={this.updateState} value={this.state.email} />
                                <input className="admins-addContainer-input" type="password" placeholder="Password" id="password" onChange={this.updateState} value={this.state.password} />
                                <input className="admins-addContainer-input" type="password" placeholder="Admin Password" id="adminPassword" onChange={this.updateState} value={this.state.adminPassword} onKeyPress={this.handleKeyPress} />
                            </div>
                            <button className="admins-addContainer-button" onClick={this.addAdmin}>Submit</button>
                        </div>
                }
                <div className="admins-listContainer">
                    {
                        this.state.admins.map((admin, index) => (
                            <div className="admins-listContainer-adminContainer" key={`adminsList-${admin.id}${admin.email}`}>
                                <div>
                                    <h3 className="admins-listContainer-adminContainer-name">{ admin.email }</h3>
                                    <div className="row">
                                        <p className="admins-listContainer-adminContainer-info">{admin.username}</p>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(Admins);
