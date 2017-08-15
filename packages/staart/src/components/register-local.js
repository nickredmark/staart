import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'
import {compose} from 'recompose'

class RegisterFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            error: null
        }
    }
    render() {
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
const RegisterForm = compose(
    withOoth,
)(RegisterFormComponent)

export default RegisterForm