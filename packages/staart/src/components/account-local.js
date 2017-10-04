import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import Form from './form'

class LocalComponent extends Component {
    render() {
        return <div>
            <Username/>
            <Email/>
            <Password/>
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
            <h2>Email</h2>
            <Form
                onSubmit={() => {
                    const email = this.email.value
                    this.props.oothClient.method('local', 'set-email', {
                        email
                    }).then(({message}) => {
                        this.setState({
                            state: 'success',
                            message
                        })
                    }).catch(({message}) => {
                        this.setState({
                            state:'error',
                            message
                        })
                    })
                }}
                state={this.state.state}
                message={this.state.message}
                submitLabel={email ? 'Change email' : 'Set email'}
            >
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="mail@example.com"
                        defaultValue={email}
                        ref={email => {
                            this.email = email
                        }}
                    />
                </div>
            </Form>
            {email &&
                <div>
                    <h3>Email verification</h3>
                    <p>{verified ? 'Verified' : 'Not verified'}.</p>
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

class PasswordComponent extends Component {
    constructor() {
        super()
        this.state = {
            error: false
        }
    }
    render() {
        return <div>
            <h2>Password</h2>
            <Form
                onSubmit={() => {
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
                    }).then((res) => {
                        this.password.value = ''
                        this.newPassword.value = ''
                        this.newPassword2.value = ''
                        this.setState({
                            state: 'success',
                            message: res.message,
                        })
                    }).catch(e => {
                        this.setState({
                            state: 'error',
                            message: e.message
                        })
                    })
                }}
                state={this.state.state}
                message={this.state.message}
                submitLabel="Change password"
            >
                <div className="form-group">
                    <label htmlFor="password">Old Password (if any)</label>
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
            </Form>
        </div>
    }
}
const Password = withOoth(PasswordComponent)
