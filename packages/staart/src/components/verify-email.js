import React, {Component} from 'react'
import {withOoth} from 'ooth-client-react'
import withI18n from '../hocs/i18n'

const VerifyEmailComponent = ({__, token, userId}) => (
        <div style={{
            maxWidth: '300px',
            margin: 'auto'
        }}>
            <h1>{__('verify-email.verify-email')}</h1>
            <VerifyEmailForm token={token} userId={userId}/>
        </div>
)
const VerifyEmail = compose(
    withI18n,
)(VerifyEmailComponent)
export default VerifyEmail

class VerifyEmailFormComponent extends Component {
    constructor() {
        super()
        this.state = {
            verified: false
        }
    }
    componentDidMount() {
        const {__} = this.props
        if (!this.props.token) {
            console.error(__('verify-email.no-token-specified'))
            return
        }
        if (!this.props.userId) {
            console.error(__('verify-email.no-userid-specified'))
        }
        this.props.oothClient.method('local', 'verify', {
            token: this.props.token,
            userId: this.props.userId,
        }).then(() => {
            this.setState({
                verified: true
            })
        }).catch(e => {
            this.setState({
                error: e.message
            })
        })
    }
    render() {
        if (!this.props.token) {
            return <p>{__('verify-email.no-token-specified')}</p>
        } else if (!this.props.userId) {
            return <p>{__('verify-email.no-userid-specified')}</p>
        } else {
            if (this.state.error) {
                return <p>{this.state.error}</p>
            } else if (this.state.verified) {
                return <p>{__('verify-email.email-verified')}</p>
            } else {
                return <p>{__('verify-email.verifying-email')}</p>
            }
        }
    }
}
const VerifyEmailForm = withOoth(VerifyEmailFormComponent)
