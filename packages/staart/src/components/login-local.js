import React, {Component} from 'react'
import {compose} from 'recompose'
import {withOoth} from 'ooth-client-react'

class LoginFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            error: null
        }
    }
    render() {
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
                <label htmlFor="username">Username or Email</label>
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
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="******"
                    ref={password => {
                        this.password = password
                    }}
                />
                <a href="/forgot-password">Forgot your password?</a>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Log in</button>
            </div>
        </form>
    }
}
const LoginForm = compose(
    withOoth,
)(LoginFormComponent)

export default LoginForm