import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'

export default ({token}) => (
        <div style={{
            maxWidth: '300px',
            margin: 'auto'
        }}>
            <h1>Reset password</h1>
            <ResetPasswordForm token={token}/>
        </div>
)

class ResetPasswordFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false
        }
    }
    render() {
        if (!this.props.token) {
            return <p>No token specified.</p>
        } else {
            if (this.state.sent) {
                return <p>Your password has been reset. <a href="/login">Log in</a> with your new password.</p>
            } else {
                return <form onSubmit={e => {
                    e.preventDefault()
                    const password = this.password.value;
                    const password2 = this.password2.value;
                    if (password !== password2) {
                        console.error('Passwords don\'t match.')
                        return
                    }
                    (async () => {
                        const response = await this.props.oothClient.method('local', 'reset-password', {
                            token: this.props.token,
                            newPassword: password
                        })
                        if (response.status === 'error') {
                            console.error(response.message)
                            return;
                        }
                        this.setState({
                            sent: true
                        })
                    })()
                }}>
                    <div className="form-group">
                        <label htmlFor="password">New Password</label>
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
                        <label htmlFor="password2">Repeat the new Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password2"
                            placeholder="******"
                            ref={password2 => {
                                this.password2 = password2
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Reset password</button>
                    </div>
                </form>
            }
        }
    }
}
const ResetPasswordForm = withOoth(ResetPasswordFormComponent)
