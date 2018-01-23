import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import withI18n from '../hocs/i18n'

class RegisterFormComponent extends Component {
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
            const email = this.email.value;
            const password = this.password.value;
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
                <label htmlFor="email">{__('register-local.email')}</label>
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
                <label htmlFor="password">{__('register-local.password')}</label>
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
                <button type="submit" className="btn btn-primary btn-block">{__('register-local.register')}</button>
            </div>
        </form>
    }
}
const RegisterForm = compose(
    withOoth,
    withI18n,
)(RegisterFormComponent)

export default RegisterForm