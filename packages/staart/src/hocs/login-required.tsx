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
      public componentDidMount(): void {
        if (!this.props.user) {
          this.props.Router.push(`/login?next=${encodeURIComponent(url)}`);
        }
      }
      public render(): JSX.Element {
        if (this.props.user) {
          return <C {...this.props} />;
        }

        return (
          <div className="container">
            <p>You need to log in to see this page.</p>
          </div>
        );
      }
    };

  return compose<Props, {}>(
    withUser,
    withRouter,
    withLoginRequired,
  );
};
