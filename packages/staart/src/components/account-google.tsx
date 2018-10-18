import { withUser } from 'ooth-client-react';
import * as React from 'react';
import { compose } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import ConnectGoogle from './login-google';
import { User } from 'ooth-client';

type Props = {
  __: __;
  user: ExtendedUser;
  clientId: string;
};

type ExtendedUser = User & {
  google: {
    email: string;
  };
};

class GoogleComponent extends React.Component<Props> {
  render() {
    const { __, user, clientId } = this.props;

    return (
      <div>
        <h2>{__('account-google.google')}</h2>
        {user.google ? (
          <div>
            <p>{__('account-google.connected-with-google')}</p>
            <p>
              {__('account-google.google-email')} {user.google.email}
            </p>
          </div>
        ) : (
          <div>
            <p>{__('account-google.no-google-login-set')}</p>
            <ConnectGoogle label={__('account-google.connect-google')} clientId={clientId} />
          </div>
        )}
      </div>
    );
  }
}
const Google = compose<Props, { clientId: string }>(
  withUser,
  withI18n,
)(GoogleComponent);

export default Google;
