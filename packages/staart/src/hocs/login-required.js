import React, {Component} from 'react'
import withRouter from './router'
import {withUser} from 'ooth-client-react'
import {compose} from 'recompose'

export default url => {
    const withLoginRequired = C => (
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
                    return <div className="container">
                        <p>You need to log in to see this page.</p>
                    </div>
                }
            }
        }
    )

    return compose(
        withUser,
        withRouter,
        withLoginRequired
    )
}
