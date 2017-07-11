import Layout from '../components/layout'
import withPage from '../providers/page'
import Register from 'staart/lib/components/register'

export default withPage(({url: {query: {next}}}) => {
    return <Layout title="Register" page="register">
        <Register next={next}/>
    </Layout>
})
