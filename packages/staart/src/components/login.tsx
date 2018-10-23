import * as React from 'react';
import { compose, Omit } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import withRedirectUser from '../hocs/redirect-user';
import Facebook from './login-facebook';
import Google from './login-google';
import Local from './login-local';

type Props = {
  __: __;
  facebookClientId: string;
  googleClientId: string;
};

const LoginComponent = ({ __, facebookClientId, googleClientId }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('login-component.login')}</h1>
    <Local />
    {(facebookClientId || googleClientId) && (
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {__('login-component.or')}
      </p>
    )}
    {facebookClientId && <Facebook clientId={facebookClientId} />}
    {googleClientId && <Google clientId={googleClientId} />}
    <p>
      {__('login-component.new-user')} <a href="/register">{__('login-component.register')}</a>.
    </p>
  </div>
);
const Login = compose<Props, Omit<Props, '__'>>(
  withRedirectUser,
  withI18n,
)(LoginComponent);

export default Login;
