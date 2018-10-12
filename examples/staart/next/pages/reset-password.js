import Layout from '../components/layout'
import withPage from '../providers/page'
import ResetPassword from 'staart/lib/components/reset-password'

export default withPage(({url: {query: {token, userId}}}) => {
    return <Layout title="Reset password" page="reset-password">
        <ResetPassword token={token} userId={userId}/>
    </Layout>
})
