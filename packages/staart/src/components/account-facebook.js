import React, {Component} from 'react'
import {withUser, withOoth} from 'ooth-client-react'
import {compose} from 'recompose'

class FacebookComponent extends Component {
    render() {
        return <div>
            <h2>Facebook</h2>
            {this.props.user.facebook ?
                <div>
                    <p>Connected with Facebook.</p>
                    <p>Facebook email: {this.props.user.facebook.email}</p>
                </div>
            :
                <p>No Facebook login set.</p>
            }
        </div>
    }
}
const Facebook = compose(
    withUser
)(FacebookComponent)

export default Facebook