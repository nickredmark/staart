import Layout from '../components/layout'
import withPage from '../providers/page'
import Account from 'staart/lib/components/account'

export default withPage(() => (
    <Layout title="Account" page="account">
    	<div className="container">
            <Account/>
        </div>
    </Layout>
))

