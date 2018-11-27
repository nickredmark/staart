import Layout from '../components/layout';
import withPage from '../providers/page';
import Login from 'staart/lib/components/login';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { facebookClientId, googleClientId, twitterClientId },
} = getConfig();

export default withPage(({ url: { query: { next } } }) => {
  return (
    <Layout title="Log in" page="login">
      <Login
        next={next}
        facebookClientId={facebookClientId}
        googleClientId={googleClientId}
        twitterClientId={twitterClientId}
      />
    </Layout>
  );
});
