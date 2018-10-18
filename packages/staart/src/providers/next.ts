import * as PropTypes from 'prop-types';
import { withContext } from 'recompose';

export default (Router: any, Link: any, Head: any) =>
  withContext(
    {
      Router: PropTypes.object,
      Link: PropTypes.func,
      Head: PropTypes.func,
    },
    () => ({
      Router,
      Link,
      Head,
    }),
  );
