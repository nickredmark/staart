import * as React from 'react';
import { compose } from 'recompose';
import { withOoth } from 'ooth-client-react';
import withI18n, { __ } from '../hocs/i18n';
import { OothClient } from 'ooth-client';

type Props = {
  clientId: string;
  oothClient: OothClient;
  label?: string;
  __: __;
  remember?: boolean;
};

type State = {
  state?: 'error' | 'success';
  message?: string;
  show?: boolean;
};

type Response = {
  oauth_token: string;
  oauth_token_secret: string;
  oauth_callback_confirmed: string;
};

class TwitterComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element | null {
    return (
      <div className="form-group">
        <button
          onClick={async () => {
            try {
              const token = await this.props.oothClient.method<Response>('twitter', 'reverse');
              const promise = new Promise<{ oauth_token: string; oauth_verifier: string }>((res) => {
                (window as any).loginTwitterRes = res;
              });
              window.open(`https://api.twitter.com/oauth/authenticate?oauth_token=${token.oauth_token}`);
              const data = await promise;
              this.setState({
                state: 'success',
                message: 'Logging you in...',
              });
              await this.props.oothClient.authenticate('twitter', 'login', { ...data, remember: this.props.remember });
              this.setState({
                state: 'success',
                message: 'Logged in successfully.',
              });
            } catch (e) {
              this.setState({
                state: 'error',
                message: e.message,
              });
            }
          }}
          type="button"
          className="btn btn-block btn-default"
          style={{
            backgroundColor: '#38A1F3',
            border: '#38A1F3',
            color: 'white',
          }}
        >
          {this.props.label ? this.props.label : this.props.__('login-twitter.login-with-twitter')}
        </button>
        {this.state.state === 'error' && (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        )}
        {this.state.state === 'success' && (
          <div className="alert alert-success" role="alert">
            {this.state.message}
          </div>
        )}
      </div>
    );
  }
}
const Twitter = compose<Props, Pick<Props, 'clientId' | 'label' | 'remember'>>(
  withOoth,
  withI18n,
)(TwitterComponent);

export default Twitter;
