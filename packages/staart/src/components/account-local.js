import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'

class LocalComponent extends Component {
    render() {
        return <div>
            <Username/>
            {this.props.user.local ?
                <div>
                    <h2>Email</h2>
                    <Email/>
                    <h2>Password</h2>
                    <ChangePasswordForm/>
                </div>
            :
                <div>
                    <h2>Email</h2>
                    <p>No login email set.</p>
                </div>
            }
        </div>
    }
}
const Local = compose(
    withUser,
)(LocalComponent)

export default Local

class EmailComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false
        }
    }
    render() {
        const user = this.props.user
        const {email, verified} = user.local || {}
        return <div>
            {email ?
                <div>
                    <p>Your login email is <b>{email}</b> ({verified ? 'verified' : 'not verified'}).</p>
                    {this.state.sent ?
                        <p>Verification email sent.</p>
                    :
                        !verified && <button onClick={() => {
                            this.props.oothClient.method('local', 'generate-verification-token')
                                .then(() => {
                                    this.setState({
                                        sent: true
                                    })
                                })
                        }} className="btn btn-default">Send verification email</button>
                    }
                </div>
            :
                <div>
                    No login email set up.
                </div>
            }
        </div>
    }
}
const Email = compose(
    withUser,
    withOoth
)(EmailComponent)

class UsernameFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            state: null,
            message: null,
        }
    }
    render() {
        const user = this.props.user
        const username = user.local && user.local.username
        return <div>
            <form onSubmit={e => {
                e.preventDefault();
                const username = this.username.value
                if (!username) {
                    return
                }
                this.props.oothClient.method('local', 'set-username', {
                    username
                }).then(({message}) => {
                    this.setState({
                        state: 'success',
                        message
                    });
                }).catch(({message}) => {
                    console.log(arguments)
                    this.setState({
                        state: 'error',
                        message
                    })
                })
            }}>
                {this.state.state === 'success' &&
                    <div className="alert alert-success" role="alert">
                        {this.state.message}
                    </div>
                }
                {this.state.state === 'error' &&
                    <div className="alert alert-danger" role="alert">
                        {this.state.message}
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder="hansolo"
                        defaultValue={username}
                        ref={username => {
                            this.username = username
                        }}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Set username</button>
                </div>
            </form>
        </div>
    }
}
const Username = compose(
    withOoth,
    withUser
)(UsernameFormComponent)

class ChangePasswordFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false,
            error: false
        }
    }
    render() {
        if (this.state.sent) {
            return <p>Password updated</p>
        } else {
            return <form onSubmit={e => {
                e.preventDefault()
                const password = this.password.value;
                const newPassword = this.newPassword.value;
                const newPassword2 = this.newPassword2.value;
                if (newPassword !== newPassword2) {
                    return this.setState({
                        error: 'Passwords don\'t match.'
                    })
                }
                this.props.oothClient.method('local', 'change-password', {
                    token: this.props.token,
                    password,
                    newPassword
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
                    <label htmlFor="password">Old Password</label>
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
                    <label htmlFor="newPassword">New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        placeholder="******"
                        ref={newPassword => {
                            this.newPassword = newPassword
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword2">Repeat the new Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="newPassword2"
                        placeholder="******"
                        ref={newPassword2 => {
                            this.newPassword2 = newPassword2
                        }}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Change password</button>
                </div>
            </form>        
        }
    }
}
const ChangePasswordForm = withOoth(ChangePasswordFormComponent)
