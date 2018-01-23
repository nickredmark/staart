import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import withI18n from '../hocs/i18n'

const ResetPasswordComponent = ({token, userId, __}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>{__('reset-password.reset-password')}</h1>
        <ResetPasswordForm token={token} userId={userId}/>
    </div>
)
const ResetPassword = compose(
    withI18n,
)(ResetPasswordComponent)
export default ResetPassword

class ResetPasswordFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            sent: false
        }
    }
    render() {
        const {__} = this.props
        if (!this.props.token) {
            return <p>{__('reset-password.no-token-specified')}</p>
        } else if (!this.props.userId) {
            return <p>{__('reset-password.no-userid-specified')}</p>
        } else {
            if (this.state.sent) {
                return <p>{__('reset-password.password-reset')} <a href="/login">{__('reset-password.login')}</a> {__('reset-password.with-new-password')}</p>
            } else {
                return <form onSubmit={e => {
                    e.preventDefault()
                    const password = this.password.value;
                    const password2 = this.password2.value;
                    if (password !== password2) {
                        console.error(__('reset-password.passwords-dont-match'))
                        return
                    }
                    this.props.oothClient.method('local', 'reset-password', {
                        userId: this.props.userId,
                        token: this.props.token,
                        newPassword: password
                    }).then(() => {
                        this.setState({
                            sent: true
                        })
                    })
                }}>
                    <div className="form-group">
                        <label htmlFor="password">{__('reset-password.new-password')}</label>
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
                        <label htmlFor="password2">{__('reset-password.repeat-new-password')}</label>
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
                        <button type="submit" className="btn btn-primary btn-block">{__('reset-password.reset-password')}</button>
                    </div>
                </form>
            }
        }
    }
}
const ResetPasswordForm = compose(
    withOoth,
    withI18n,
)(ResetPasswordFormComponent)
