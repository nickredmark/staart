import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'

class GoogleComponent extends Component {
    render() {
        return <div>
            <h2>Google</h2>
            {this.props.user.google ?
                <div>
                    <p>Connected with Google.</p>
                    <p>Google email: {this.props.user.google.email}</p>
                </div>
            :
                <p>No Google login set.</p>
            }
        </div>
    }
}
const Google = compose(
    withUser
)(GoogleComponent)

export default Google
