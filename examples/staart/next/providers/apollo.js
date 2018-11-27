import withApollo from 'ooth-client-react-next-apollo';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { url },
  serverRuntimeConfig,
} = getConfig();

export default withApollo({
  url: `${(serverRuntimeConfig && serverRuntimeConfig.url) || url}/api`,
});
