import * as React from 'react';
import { withUser } from 'ooth-client-react';
import withRouter from './router';
import { compose } from 'recompose';
import { User } from 'ooth-client';

type Props = {
  user: User;
  next: string;
  Router: any;
};

export default (C: React.ComponentClass | React.SFC) => {
  class Redirect extends React.Component<Props> {
    public componentDidMount(): void {
      if (this.props.user) {
        this.props.Router.push(this.props.next || '/dashboard');
      }
    }

    public componentDidUpdate(): void {
      if (this.props.user) {
        this.props.Router.push(this.props.next || '/dashboard');
      }
    }

    public render(): JSX.Element {
      if (this.props.user) {
        return (
          <div
            style={{
              maxWidth: '300px',
              margin: 'auto',
            }}
          >
            <p>
              You are logged in. Click <a href={this.props.next || '/dashboard'}>here</a> if don't get redirected.
            </p>
          </div>
        );
      }

      return <C {...this.props} />;
    }
  }
  return compose<Props, {}>(
    withUser,
    withRouter,
  )(Redirect);
};
