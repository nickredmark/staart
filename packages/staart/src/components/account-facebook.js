import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'
import ConnectFacebook from './login-facebook'
import withI18n from '../hocs/i18n'

class FacebookComponent extends Component {
    render() {
        const {__, user} = this.props

        return <div>
            <h2>{__('account-facebook.facebook')}</h2>
            {user.facebook ?
                <div>
                    <p>{__('account-facebook.connected-with-facebook')}</p>
                    <p>{__('account-facebook.facebook-email')} {user.facebook.email}</p>
                </div>
            :
                <div>
                    <p>{__('account-facebook.no-facebook-login-set')}</p>
                    <ConnectFacebook label={__('account-facebook.connect-facebook')}/>
                </div>
            }
        </div>
    }
}
const Facebook = compose(
    withUser,
    withI18n,
)(FacebookComponent)

export default Facebook