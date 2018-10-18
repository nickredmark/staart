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
};

type Response = {
  authResponse: {
    accessToken: string;
  };
};

type State = {
  state?: 'error';
  message?: string;
  show?: boolean;
};

class FacebookComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (typeof (window as any).FB === 'undefined') {
      const $script = require('scriptjs');
      $script('//connect.facebook.net/en_US/sdk.js', () => {
        (window as any).FB.init({
          appId: this.props.clientId,
          version: 'v2.10',
        });
        this.setState({
          show: true,
        });
      });
    } else {
      this.setState({
        show: true,
      });
    }
  }

  render() {
    if (this.state.show) {
      return (
        <div className="form-group">
          <button
            onClick={() => {
              (window as any).FB.login(
                (response: Response) => {
                  this.props.oothClient
                    .authenticate('facebook', 'login', {
                      access_token: response.authResponse.accessToken,
                    })
                    .catch((e) => {
                      this.setState({
                        state: 'error',
                        message: e.message,
                      });
                    });
                },
                {
                  scope: 'email',
                },
              );
            }}
            type="button"
            className="btn btn-block btn-default"
            style={{
              backgroundColor: '#3B5998',
              border: '#3B5998',
              color: 'white',
            }}
          >
            {this.props.label ? this.props.label : this.props.__('login-facebook.login-with-facebook')}
          </button>
          {this.state.state === 'error' && (
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}
const Facebook = compose<Props, { clientId: string; label?: string }>(
  withOoth,
  withI18n,
)(FacebookComponent);

export default Facebook;
