import {compose} from 'recompose'
import {withOoth, withUser} from 'ooth-client-react'
import withRouter from '../hocs/router'
import React, {Component} from 'react'

const Login = ({next}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Log in</h1>
        <LoginForm next={next}/>
        <p style={{
            textAlign: 'center'
        }}>or</p>
        <div className="form-group">
            <button type="button" className="btn btn-block btn-default" style={{
                backgroundColor: "#3B5998",
                border: "#3B5998",
                color: 'white'
            }}>Log in with Facebook</button>
        </div>
        <div className="form-group">
            <button type="button" className="btn btn-block btn-default" style={{
                backgroundColor: '#d34836',
                border: '#d34836',
                color: 'white'
            }}>Log in with Google</button>
        </div>
        <p>New user? <a href="/register">register</a>.</p>
    </div>
)
export default Login

class LoginFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            error: null
        }
    }
    componentDidMount() {
        if (this.props.user) {
            this.props.Router.push(this.props.next || '/dashboard')
        }
    }
    componentDidUpdate() {
        if (this.props.user) {
            this.props.Router.push(this.props.next || '/dashboard')
        }
    }
    render() {
        if (this.props.user) {
            return <p>You are logged in.</p>
        } else {
            return <form onSubmit={e => {
                e.preventDefault()
                const username = this.username.value,
                    password = this.password.value;
                this.props.oothClient.authenticate('local', 'login', {
                    username,
                    password
                }).catch(e => {
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
}
export const LoginForm = compose(
    withRouter,
    withOoth,
    withUser
)(LoginFormComponent)
