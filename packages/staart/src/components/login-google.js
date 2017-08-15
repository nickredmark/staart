import React, {Component} from 'react'
import withSettings from '../hocs/settings'
import {withOoth} from 'ooth-client-react'
import {compose} from 'recompose'

class GoogleComponent extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentDidMount() {
        if (typeof gapi === 'undefined') {
            const $script = require('scriptjs')
            $script('//apis.google.com/js/client:platform.js', () => {
                gapi.load('auth2', () => {
                    if (!gapi.auth2.getAuthInstance()) {
                        gapi.auth2.init({
                            client_id: this.props.settings.google.clientId,
                            /*
                            cookiepolicy,
                            login_hint,
                            hosted_domain,
                            fetch_basic_profile,
                            discoveryDocs,
                            ux_mode,
                            redirect_uri
                            */
                        }).then((res) => {
                            this.setState({
                                show: true
                            })
                        }, (err) => {
                            console.log('error', err)
                        })
                    } else {
                        this.setState({
                            show: true
                        })
                    }
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
                        const auth2 = gapi.auth2.getAuthInstance();
                        auth2.signIn(/*{
                            response_type,
                            redirect_uri,
                            fetch_basic_profile,
                            prompt,
                            scope
                        }*/)
                            .then((res) => {
                                return this.props.oothClient.authenticate('google', 'login', {
                                    id_token: res.getAuthResponse().id_token,
                                }).catch(e => {
                                    this.setState({
                                        state: 'error',
                                        message: e.message,
                                    })
                                })
                            }, e => {
                                this.setState({
                                    state: 'error',
                                    message: e.message,
                                })
                            })
                    }}
                    type="button"
                    className="btn btn-block btn-default"
                    style={{
                        backgroundColor: '#d34836',
                        border: '#d34836',
                        color: 'white'
                    }}
                >
                    {this.props.label ? this.props.label : 'Log in with Google'}
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
const Google = compose(
    withOoth,
    withSettings
)
(GoogleComponent)

export default Google