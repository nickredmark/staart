import { withUser } from 'ooth-client-react';
import * as React from 'react';
import { compose } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import ConnectFacebook from './login-facebook';
import { User } from 'ooth-client';

type Props = {
  __: __;
  user: ExtendedUser;
  clientId: string;
};

type ExtendedUser = User & {
  facebook: {
    email: string;
  };
};

class FacebookComponent extends React.Component<Props> {
  render() {
    const { __, user, clientId } = this.props;

    return (
      <div>
        <h2>{__('account-facebook.facebook')}</h2>
        {user.facebook ? (
          <div>
            <p>{__('account-facebook.connected-with-facebook')}</p>
            <p>
              {__('account-facebook.facebook-email')} {user.facebook.email}
            </p>
          </div>
        ) : (
          <div>
            <p>{__('account-facebook.no-facebook-login-set')}</p>
            <ConnectFacebook label={__('account-facebook.connect-facebook')} clientId={clientId} />
          </div>
        )}
      </div>
    );
  }
}
const Facebook = compose<Props, { clientId: string }>(
  withUser,
  withI18n,
)(FacebookComponent);

export default Facebook;
