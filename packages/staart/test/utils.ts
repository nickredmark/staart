import { OothClient } from 'ooth-client';
import withOothNext from 'ooth-client-react-next';

const oothClient = new OothClient({
  url: `http://localhost/auth`,
  secondaryAuthMode: 'session',
});

export const provideOothNext = withOothNext(() => oothClient);
