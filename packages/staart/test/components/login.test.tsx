import * as React from 'react';
import { create } from 'react-test-renderer';
import Login from '../../src/components/login';
import { provideOothNext } from '../../test/utils';
import { compose, withContext } from 'recompose';
import * as PropTypes from 'prop-types';

const provideI18n = withContext({ __: PropTypes.func }, () => ({ __: (key: string) => key }));

const LoginWithOoth = compose<any, any>(
  provideOothNext,
  provideI18n,
)(Login);

describe('<Login />', () => {
  test('renders', async () => {
    const component = create(<LoginWithOoth />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
