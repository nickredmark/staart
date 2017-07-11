import {withOoth, withUser} from 'ooth-client-react'
import React, {Component} from 'react'
import {compose} from 'recompose'

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
        if (this.props.user) {
            return <p>Logging you out...</p>
        } else {
            return <p>Good bye!</p>
        }
    }
}
const Logout = compose(
    withOoth,
    withUser
)(LogoutComponent)
