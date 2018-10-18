import * as React from 'react';
import { compose, Omit } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import withRedirectUser from '../hocs/redirect-user';
import Facebook from './login-facebook';
import Google from './login-google';
import Local from './register-local';

type Props = {
  __: __;
  facebookClientId: string;
  googleClientId: string;
};

const RegisterComponent = ({ __, facebookClientId, googleClientId }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('register.register')}</h1>
    <Local />
    <p
      style={{
        textAlign: 'center',
      }}
    >
      {__('register.or')}
    </p>
    <Facebook clientId={facebookClientId} label={__('login-facebook.register-with-facebook')} />
    <Google clientId={googleClientId} label={__('login-google.register-with-google')} />
    <p>
      {__('register.have-account')} <a href="/login">{__('register.login')}</a>.
    </p>
  </div>
);
const Register = compose<Props, Omit<Props, '__'>>(
  withRedirectUser,
  withI18n,
)(RegisterComponent);

export default Register;
