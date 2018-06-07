import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import PropTypes from 'prop-types';

import { validateEmail } from 'utils/emailValidation'
import './emailValidation.css';

class EmailValidation extends Component {
    static contextTypes = {
        location: PropTypes.object,
        router: PropTypes.object
    }

    static defaultProps = {
        location: {}
    };

    static propTypes = {
        location: PropTypes.object
    }

    constructor(props) {
        super(props);

        this.state = {
            token: '',
            emailVerified: false,
            verifying: true,
            error: '',
            verificationError: false
        }
      }

    componentWillMount = () => {
        let token = this.props.match.params.token;
        this.setState({
            token
        })
        validateEmail(token)
            .then(response => {
                if (response.validated) {
                    this.setState({
                        emailVerified: true,
                        verifying: false
                    })
                } else {
                    this.setState({
                        verificationError: true,
                        error: response.error
                    })
                }
            })
    }

    render() {
        return (
        <div className="emailValidation">
            <h1>Email Validation</h1>
            {
                this.state.verifying &&
                    <p>Verifying... be patient</p>
            }
            {
                this.state.emailVerified &&
                    <p>Email Verified</p>
            }
        </div>
        );
    }
}

export default EmailValidation;
