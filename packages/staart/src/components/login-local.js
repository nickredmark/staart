import React, {Component} from 'react'
import {compose} from 'recompose'
import {withOoth} from 'ooth-client-react'
import withI18n from '../hocs/i18n'

class LoginFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            error: null
        }
    }
    render() {
        const {__} = this.props
        return <form onSubmit={e => {
            e.preventDefault()
            const username = this.username.value,
                password = this.password.value;
            this.props.oothClient.authenticate('local', 'login', {
                username,
                password
            })
            .catch(e => {
                this.setState({
                    error: e.message
                })
            })
        }}>
            {this.state.error &&
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
            }
            <div className="form-group">
                <label htmlFor="username">{__('login-local.username-or-email')}</label>
                <input
                    type="string"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    ref={username => {
                        this.username = username
                    }}
                />
            </div>
            <div className="form-group">
                <label htmlFor="password">{__('login-local.password')}</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="******"
                    ref={password => {
                        this.password = password
                    }}
                />
                <a href="/forgot-password">{__('login-local.forgot-your-password')}</a>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">{__('login-local.login')}</button>
            </div>
        </form>
    }
}
const LoginForm = compose(
    withOoth,
    withI18n,
)(LoginFormComponent)

export default LoginForm
