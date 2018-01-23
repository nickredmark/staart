import {withOoth, withUser} from 'ooth-client-react'
import React, {Component} from 'react'
import {compose} from 'recompose'
import withI18n from '../hocs/i18n'

export default () => (
    <div className="container">
        <h1>Log out</h1>
        <Logout/>
    </div>
)

class LogoutComponent extends Component {
    componentDidMount() {
        if (this.props.user) {
            this.props.oothClient.logout();
        }
    }
    render() {
        const {__, user} = this.props
        if (user) {
            return <p>{__('logout.logging-out')}</p>
        } else {
            return <p>{__('logout.goodbye')}</p>
        }
    }
}
const Logout = compose(
    withOoth,
    withUser,
    withI18n,
)(LogoutComponent)
