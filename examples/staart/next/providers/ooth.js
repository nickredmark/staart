import { OothClient } from 'ooth-client';
import withOothNext from 'ooth-client-react-next';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { url },
} = getConfig();

export default withOothNext(
  () =>
    new OothClient({
      url: `${url}/auth`,
    }),
);
