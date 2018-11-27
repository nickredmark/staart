import * as React from 'react';
import { compose, Omit, withState } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import withRedirectUser from '../hocs/redirect-user';
import Facebook from './login-facebook';
import Google from './login-google';
import Local from './login-local';
import Twitter from './login-twitter';

type Props = {
  __: __;
  facebookClientId?: string;
  googleClientId?: string;
  twitterClientId?: string;
  remember: boolean;
  setRemember: (remember: boolean) => void;
};

const LoginComponent = ({ __, facebookClientId, googleClientId, twitterClientId, remember, setRemember }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('login-component.login')}</h1>
    <div className="checkbox">
      <label>
        <input name="remember" type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
        {__('login-component.remember')}
      </label>
    </div>
    <Local remember={remember} />
    {(facebookClientId || googleClientId || twitterClientId) && (
      <p
        style={{
          textAlign: 'center',
        }}
      >
        {__('login-component.or')}
      </p>
    )}
    {facebookClientId && <Facebook clientId={facebookClientId} remember={remember} />}
    {googleClientId && <Google clientId={googleClientId} remember={remember} />}
    {twitterClientId && <Twitter clientId={twitterClientId} remember={remember} />}
    <p>
      {__('login-component.new-user')} <a href="/register">{__('login-component.register')}</a>.
    </p>
  </div>
);
const Login = compose<Props, Omit<Props, '__' | 'remember' | 'setRemember'>>(
  withRedirectUser,
  withI18n,
  withState('remember', 'setRemember', false),
)(LoginComponent);

export default Login;
