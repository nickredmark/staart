import Layout from '../components/layout'
import withPage from '../providers/page'
import ResetPassword from 'staart/lib/components/reset-password'

export default withPage(({url: {query: {token}}}) => {
    return <Layout title="Reset password" page="reset-password">
        <ResetPassword token={token}/>
    </Layout>
})
