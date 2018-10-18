import { withOoth, withUser } from 'ooth-client-react';
import * as React from 'react';
import { compose } from 'recompose';
import withI18n, { __ } from '../hocs/i18n';
import { User, OothClient } from 'ooth-client';

export default () => (
  <div className="container">
    <h1>Log out</h1>
    <Logout />
  </div>
);

type Props = {
  user: User;
  oothClient: OothClient;
  __: __;
};

class LogoutComponent extends React.Component<Props> {
  componentDidMount() {
    if (this.props.user) {
      this.props.oothClient.logout();
    }
  }
  render() {
    const { __, user } = this.props;
    if (user) {
      return <p>{__('logout.logging-out')}</p>;
    } else {
      return <p>{__('logout.goodbye')}</p>;
    }
  }
}
const Logout = compose<Props, {}>(
  withOoth,
  withUser,
  withI18n,
)(LogoutComponent);
