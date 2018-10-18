import Layout from '../components/layout';
import withPage from '../providers/page';
import Account from 'staart/lib/components/account';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { facebookClientId, googleClientId },
} = getConfig();

export default withPage(() => (
  <Layout title="Account" page="account">
    <div className="container">
      <Account facebookClientId={facebookClientId} googleClientId={googleClientId} />
    </div>
  </Layout>
));
