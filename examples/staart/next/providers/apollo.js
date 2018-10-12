import withApollo from 'ooth-client-react-next-apollo'
import settings from '../public-settings'

export default withApollo({
    url: `${settings.url}/graphql`,
})
