import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import withI18n from '../hocs/i18n'

const ForgotPasswordComponent = ({__}) => (
    <div style={{
        maxWidth: '300px',
        margin: 'auto'
    }}>
        <h1>{__('forgot-password.forgot-password')}</h1>
        <ForgotPasswordForm/>
        <p>{__('forgot-password.back-to')} <a href="/login">{__('forgot-password.login-page')}</a>.</p>
    </div>
)
const ForgotPassword = compose(
    withI18n,    
)(ForgotPasswordComponent)
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
        const {__} = this.props

        if (this.state.sent) {
            return <p>{__('forgot-password.password-reset-email-sent')}</p>
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
                    <label htmlFor="username">{__('forgot-password.username-or-email')}</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        placeholder={__('forgot-password.username-or-email')}
                        ref={username => {
                            this.username = username
                        }}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">{__('forgot-password.send-reset-password-email')}</button>
                </div>
            </form>
        }
    }
}
const ForgotPasswordForm = compose(
    withOoth,
    withI18n
)(ForgotPasswordFormComponent)

