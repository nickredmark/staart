import { withUser } from 'ooth-client-react';
import * as React from 'react';
import { compose } from 'recompose';

import withI18n, { __ } from '../hocs/i18n';
import ConnectTwitter from './login-twitter';
import { User } from 'ooth-client';

type Props = {
  __: __;
  user: ExtendedUser;
  clientId: string;
};

type ExtendedUser = User & {
  twitter: {
    email: string;
  };
};

class TwitterComponent extends React.Component<Props> {
  public render(): JSX.Element {
    const { __, user, clientId } = this.props;

    return (
      <div>
        <h2>{__('account-twitter.twitter')}</h2>
        {user.twitter ? (
          <div>
            <p>{__('account-twitter.connected-with-twitter')}</p>
            <p>
              {__('account-twitter.twitter-email')} {user.twitter.email}
            </p>
          </div>
        ) : (
          <div>
            <p>{__('account-twitter.no-twitter-login-set')}</p>
            <ConnectTwitter label={__('account-twitter.connect-twitter')} clientId={clientId} />
          </div>
        )}
      </div>
    );
  }
}
const Twitter = compose<Props, { clientId: string }>(
  withUser,
  withI18n,
)(TwitterComponent);

export default Twitter;
