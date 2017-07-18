import React, {Component} from 'react'
import withRouter from '../hocs/router'
import {withOoth, withUser} from 'ooth-client-react'
import {compose} from 'recompose'

export default ({next}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Register</h1>
        <RegisterForm next={next}/>
        <p style={{
            textAlign: 'center'
        }}>or</p>
        <div className="form-group">
            <button type="button" className="btn btn-block btn-default" style={{
                backgroundColor: "#3B5998",
                border: "#3B5998",
                color: 'white'                
            }}>Register with Facebook</button>
        </div>
        <div className="form-group">
            <button type="button" className="btn btn-block btn-default" style={{
                backgroundColor: '#d34836',
                border: '#d34836',
                color: 'white'
            }}>Register with Google</button>
        </div>
        <p>Already have an account? <a href="/login">Log in</a>.</p>
    </div>
)

class RegisterFormComponent extends Component {
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
                const email = this.email.value,
                    password = this.password.value;
                this.props.oothClient.method('local', 'register', {
                    email,
                    password
                }).then(() => {
                    const authResponse = this.props.oothClient.authenticate('local', 'login', {
                        username: email,
                        password
                    })
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
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Email"
                        ref={email => {
                            this.email = email
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
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
            </form>
        }
    }
}
const RegisterForm = compose(
    withRouter,
    withOoth,
    withUser
)(RegisterFormComponent)
