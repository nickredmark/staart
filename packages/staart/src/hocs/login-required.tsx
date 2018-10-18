import * as React from 'react';
import withRouter from './router';
import { withUser } from 'ooth-client-react';
import { compose } from 'recompose';
import { User } from 'ooth-client';

type Props = {
  user: User;
  Router: any;
};

export default (url: string) => {
  const withLoginRequired = (C: React.ComponentClass | React.SFC) =>
    class extends React.Component<Props> {
      componentDidMount() {
        if (!this.props.user) {
          this.props.Router.push(`/login?next=${encodeURIComponent(url)}`);
        }
      }
      render() {
        if (this.props.user) {
          return <C {...this.props} />;
        } else {
          return (
            <div className="container">
              <p>You need to log in to see this page.</p>
            </div>
          );
        }
      }
    };

  return compose<Props, {}>(
    withUser,
    withRouter,
    withLoginRequired,
  );
};
