import provideOothNext from './ooth';
import provideNext from './next';
import provideApolloNext from './apollo';
import provideI18n from './i18n';
import { compose } from 'recompose';

export default compose(
  provideApolloNext,
  provideOothNext,
  provideNext,
  provideI18n,
);
