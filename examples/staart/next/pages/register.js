import Layout from '../components/layout';
import withPage from '../providers/page';
import Register from 'staart/lib/components/register';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { facebookClientId, googleClientId },
} = getConfig();

export default withPage(({ url: { query: { next } } }) => {
  return (
    <Layout title="Register" page="register">
      <Register next={next} facebookClientId={facebookClientId} googleClientId={googleClientId} />
    </Layout>
  );
});
