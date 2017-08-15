import React, {Component} from 'react'
import {compose} from 'recompose'
import {withOoth} from 'ooth-client-react'
import withSettings from '../hocs/settings'

class FacebookComponent extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        if (typeof FB === 'undefined') {
            const $script = require('scriptjs')
            $script('//connect.facebook.net/en_US/sdk.js', ()  => {
                FB.init({
                    appId: this.props.settings.facebook.appId,
                    version: 'v2.10'
                })
                this.setState({
                    show: true
                })
            })
        } else {
            this.setState({
                show: true
            })
        }
    }

    render() {
        if (this.state.show) {
            return <div className="form-group">
                <button
                    onClick={() => {
                        FB.login(response => {
                            this.props.oothClient.authenticate('facebook', 'login', {
                                access_token: response.authResponse.accessToken,
                            })
                            .catch(e => {
                                this.setState({
                                    state: 'error',
                                    message: e.message
                                })
                            })
                        }, {
                            scope: 'email'
                        })
                    }}
                    type="button" className="btn btn-block btn-default"
                    style={{
                        backgroundColor: "#3B5998",
                        border: "#3B5998",
                        color: 'white'
                    }}
                >
                    {this.props.label ? this.props.label : 'Log in with Facebook'}
                </button>
                {this.state.state === 'error' &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                }
            </div>
        } else {
            return null
        }
    }
}
const Facebook = compose(
    withOoth,
    withSettings,
)(FacebookComponent)

export default Facebook