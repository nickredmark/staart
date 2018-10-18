import * as React from 'react';
import withLoginRequired from '../hocs/login-required';
import withI18n, { __ } from '../hocs/i18n';
import { compose } from 'recompose';
import Local from './account-local';
import Facebook from './account-facebook';
import Google from './account-google';

type Props = {
  __: __;
  facebookClientId: string;
  googleClientId: string;
};

const AccountComponent = ({ __, facebookClientId, googleClientId }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('account.account')}</h1>
    <h2>{__('account-local.username.username')}</h2>
    <Local />
    <Facebook clientId={facebookClientId} />
    <Google clientId={googleClientId} />
  </div>
);
const Account = compose<Props, { facebookClientId: string; googleClientId: string }>(
  withLoginRequired('/account'),
  withI18n,
)(AccountComponent);
export default Account;
