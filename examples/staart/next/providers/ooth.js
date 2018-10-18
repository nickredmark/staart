import { OothClient } from 'ooth-client';
import withOothNext from 'ooth-client-react-next';
import getConfig from 'next/config';

const {
  publicRuntimeConfig: { url },
} = getConfig();

const oothClient = new OothClient({
  url: `${url}/auth`,
});

export default withOothNext(oothClient);
