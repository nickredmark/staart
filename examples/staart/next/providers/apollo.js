import withApollo from 'ooth-client-react-next-apollo';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { url },
} = getConfig();

export default withApollo({
  url: `${url}/api`,
});
