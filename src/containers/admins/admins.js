import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getAdmins } from 'utils/admins';

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
            admins: []
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

    render() {
        return (
        <div className="admins"> 
            <h1>Admins</h1>
            {
                this.state.admins.map(admin => (
                    <div className="admins-adminContainer">
                        <h1>{ admin.email }</h1>
                    </div>
                ))
            }
        </div>
        );
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Admins);
