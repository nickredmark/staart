import * as PropTypes from 'prop-types';
import { getContext } from 'recompose';

export default getContext({
  __: PropTypes.func,
});

export type __ = (s: string) => string;
