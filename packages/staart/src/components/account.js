import Layout from './layout'
import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import withRouter from '../hocs/router'

const withLoginRequired = (url) => (
    C => (
        class extends Component {
            componentDidMount() {
                if (!this.props.user) {
                    this.props.Router.push(`/login?next=${encodeURIComponent(url)}`)
                }
            }
            render() {
                if (this.props.user) {
                    return <C/>
                } else {
                    return <p>You need to log in to see this page.</p>
                }
            }
        }
    )
)

const AccountComponent = () => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>Account</h1>
        <h2>Username</h2>
        <Username/>
        <h2>Email</h2>
        <Email/>
        <h2>Password</h2>
        <ChangePasswordForm/>
    </div>
)
const Account = compose(
    withUser,
    withRouter,
    withLoginRequired('/account')
)(AccountComponent)
export default Account

class EmailComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false
        }
    }
    render() {
        const user = this.props.user
        return <div>
            <p>Your email is <b>{user.local.email}</b> ({user.local.verified ? 'verified' : 'not verified'}).</p>
            {this.state.sent ?
                <p>Verification email sent.</p>
            :
                !user.local.verified && <button onClick={() => {
                    this.props.oothClient.method('local', 'generate-verification-token')
                        .then(() => {
                            this.setState({
                                sent: true
                            })
                        })
                }} className="btn btn-default">Send verification email</button>
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
            sent: false,
            error: false
        }
    }
    render() {
        const user = this.props.user
        if (this.state.sent) {
            return <p>Username updated.</p>
        } else {
            return <div>
                {user.local.username ?
                    <p>Your current username is <b>{user.local.username}</b>.</p>
                :
                    <p>You haven't set a username yet.</p>
                }
                <form onSubmit={e => {
                    e.preventDefault();
                    const username = this.username.value
                    if (!username) {
                        return
                    }
                    this.props.oothClient.method('local', 'set-username', {
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
                        <label htmlFor="username">Username</label>
                        <input
                            type="username"
                            className="form-control"
                            id="username"
                            placeholder="hansolo"
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
