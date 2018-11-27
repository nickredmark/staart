import * as React from 'react';
import { compose, Omit } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import withRedirectUser from '../hocs/redirect-user';
import Facebook from './login-facebook';
import Google from './login-google';
import Twitter from './login-twitter';
import Local from './register-local';

type Props = {
  __: __;
  facebookClientId?: string;
  googleClientId?: string;
  twitterClientId?: string;
};

const RegisterComponent = ({ __, facebookClientId, googleClientId, twitterClientId }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('register.register')}</h1>
    <Local />
    {(facebookClientId || googleClientId || twitterClientId) && (
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {__('register.or')}
      </p>
    )}
    {facebookClientId && <Facebook clientId={facebookClientId} label={__('login-facebook.register-with-facebook')} />}
    {googleClientId && <Google clientId={googleClientId} label={__('login-google.register-with-google')} />}
    {twitterClientId && <Twitter clientId={twitterClientId} label={__('login-twitter.register-with-twitter')} />}
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
