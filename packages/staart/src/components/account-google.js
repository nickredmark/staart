import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import ConnectGoogle from './login-google'
import withI18n from '../hocs/i18n'

class GoogleComponent extends Component {
    render() {
        const {__, user} = this.props

        return <div>
            <h2>{__('account-google.google')}</h2>
            {user.google ?
                <div>
                    <p>{__('account-google.connected-with-google')}</p>
                    <p>{__('account-google.google-email')} {user.google.email}</p>
                </div>
            :
                <div>
                    <p>{__('account-google.no-google-login-set')}</p>
                    <ConnectGoogle label={__('account-google.connect-google')}/>
                </div>
            }
        </div>
    }
}
const Google = compose(
    withUser,
    withI18n,
)(GoogleComponent)

export default Google
