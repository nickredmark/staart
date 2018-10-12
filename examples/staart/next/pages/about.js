import Layout from '../components/layout'
import withPage from '../providers/page'

export default withPage(() => (
  <Layout title="About Staart" page="about">
      <div className="container">
        <h2>About Staart</h2>
        <p>This is a sample site created with Staart, a lightweight UI components library integrated with Ooth, a user accounts library for node.</p>
        <h3>Philosophy</h3>
        <p>Note: Right now, Staart is a prototype that I built quickly to fulfill my needs. Over time, hopefully, it will improve. What follows is what Staart aims to be.</p>
        <p>Staart is <b>not a framework</b>. Staart should introduce the least amount of technology coupling possible. Pick and choose the pieces you like and glue them together as you wish. There might be utilities that do the coupling for you, but it should be straightforward to replace them with something else. You should stay in control.</p>
        <p>Staart is <b>not a boilerplate</b>. Boilerplates help you get started quickly and allow you to stay in control. But afterwards you are on your own. Plus, boilerplates don't get maintained, because even the creators' code bases diverge from the boilerplates they produced. Ideally, your code base should contain nothing more than business logic.</p>
        <p>Staart is <b>not a code generator</b> for the same reasons it's not a boilerplate.</p>
        <p>What Staart is: <b>a set of components and libraries</b> that can be easily glued together to bootstrap a project, with minimum boilerplate code.</p>
        <h2>About Nick Redmark</h2>
        <p>Hi, I'm Nick Redmark, I'm the developer of these open source projects. I created them mainly for myself, to have a quick way to create new websites that need user accounts. Check out my projects on my <a href="http://nickredmark.com" target="_blank">personal site</a>.</p>
        <img src="/static/nickredmark.jpg" style={{
          maxWidth: '100%',
          width: '200px'
        }}/>
      </div>
  </Layout>
))
