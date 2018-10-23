import { OothClient } from 'ooth-client';
import withOothNext from 'ooth-client-react-next';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { url },
  serverRuntimeConfig,
} = getConfig();

export default withOothNext(
  () =>
    new OothClient({
      url: `${(serverRuntimeConfig && serverRuntimeConfig.url) || url}/auth`,
    }),
);
