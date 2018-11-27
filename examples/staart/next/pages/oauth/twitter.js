import withPage from '../../providers/page';
import Layout from '../../components/layout';
import { withOoth } from 'ooth-client-react';
import { compose } from 'recompose';

export default withPage(({ url: { query: { oauth_token, oauth_verifier } } }) => {
  return (
    <Layout title="Connecting Twitter" page="twitter">
      <ConnectTwitter oauth_token={oauth_token} oauth_verifier={oauth_verifier} />
    </Layout>
  );
});

class ConnectTwitterComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {
    window.opener.loginTwitterRes({ oauth_token: this.props.oauth_token, oauth_verifier: this.props.oauth_verifier });
    window.close();
  }
  render() {
    if (this.state.status === 'error') {
      return <div className="alert-error">{this.state.message}</div>;
    }

    return <div>Connecting Twitter...</div>;
  }
}
const ConnectTwitter = compose(withOoth)(ConnectTwitterComponent);
