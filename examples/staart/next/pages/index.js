import Layout from '../components/layout'
import withPage from '../providers/page'

export default withPage(() => {
  return <Layout title="Get staarted!" page="home">
        <div className="container">
          <div className="jumbotron">
              <h1>Get staarted!</h1>
              <p>Get started ultrarapidly with a node.js web application with user accounts.</p>
              <p><a className="btn btn-primary btn-lg" href="/about" role="button">Learn more &raquo;</a></p>
          </div>
          <div className="row">
            <div className="col-md-4">
              <h2>Starter UI</h2>
              <p>Staart is a lightweight set of React components to quickly bootstrap a site.</p>
              <p><a className="btn btn-default" href="/about" role="button">Learn more &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>User Accounts logic</h2>
              <p>Ooth is a user accounts library for node. Together with Staart you can quickly set up a platform with user accounts.</p>
              <p><a className="btn btn-default" href="/register" role="button">Test the register function &raquo;</a></p>
            </div>
            <div className="col-md-4">
              <h2>Support on Patreon</h2>
              <p>This is an open source library. Support it on Patreon.</p>
              <p><a className="btn btn-default" href="https://www.patreon.com/nmaro" role="button">Patreon &raquo;</a></p>
            </div>
          </div>
        </div>
    </Layout>  
})
