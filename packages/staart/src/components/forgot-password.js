import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'

const ForgotPassword = () => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Forgot password</h1>
        <ForgotPasswordForm/>
        <p>Back to <a href="/login">log in page</a>.</p>
    </div>
)
export default ForgotPassword


class ForgotPasswordFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false,
            error: null,
        }
    }
    render() {
        if (this.state.sent) {
            return <p>A password reset email has been sent.</p>
        } else {
            return <form onSubmit={e => {
                e.preventDefault()
                const username = this.username.value;
                this.props.oothClient.method('local', 'forgot-password', {
                    username
                }).then(() => {
                    this.setState({
                        sent: true
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
                    <label htmlFor="username">Username or Email</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder="Username or email"
                        ref={username => {
                            this.username = username
                        }}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Send reset password email</button>
                </div>
            </form>
        }
    }
}
const ForgotPasswordForm = withOoth(ForgotPasswordFormComponent)
