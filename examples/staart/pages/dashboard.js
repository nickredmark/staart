import Layout from '../components/layout'
import withPage from '../providers/page'

export default withPage(() => (
    <Layout title="Dashboard" page="dashboard">
        <div className="container">
            <h1>Dashboard</h1>
            <p>This is where users get redirected after login.</p>
        </div>
    </Layout>
))
