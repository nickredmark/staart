import * as React from 'react';
import { withOoth } from 'ooth-client-react';
import { compose } from 'recompose';
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
  state?: 'error';
  message?: string;
  show?: boolean;
};

type Response = {
  getAuthResponse: () => {
    id_token: string;
  };
};

class GoogleComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public componentDidMount(): void {
    if (typeof (window as any).gapi === 'undefined') {
      const $script = require('scriptjs');
      $script('//apis.google.com/js/client:platform.js', () => {
        const gapi = (window as any).gapi;
        gapi.load('auth2', () => {
          if (!gapi.auth2.getAuthInstance()) {
            gapi.auth2
              .init({
                client_id: this.props.clientId,
                /*
                            cookiepolicy,
                            login_hint,
                            hosted_domain,
                            fetch_basic_profile,
                            discoveryDocs,
                            ux_mode,
                            redirect_uri
                            */
              })
              .then(
                (_res: Response) => {
                  this.setState({
                    show: true,
                  });
                },
                (err: Error) => {
                  console.log('error', err);
                },
              );
          } else {
            this.setState({
              show: true,
            });
          }
        });
      });
    } else {
      this.setState({
        show: true,
      });
    }
  }
  public render(): JSX.Element | null {
    if (!this.state.show) {
      return null;
    }
    return (
      <div className="form-group">
        <button
          onClick={() => {
            const auth2 = (window as any).gapi.auth2.getAuthInstance();
            auth2
              .signIn(/*{
                            response_type,
                            redirect_uri,
                            fetch_basic_profile,
                            prompt,
                            scope
                        }*/)
              .then(
                (res: Response) => {
                  return this.props.oothClient
                    .authenticate('google', 'login', {
                      id_token: res.getAuthResponse().id_token,
                      remember: this.props.remember,
                    })
                    .catch((e) => {
                      this.setState({
                        state: 'error',
                        message: e.message,
                      });
                    });
                },
                (e: Error) => {
                  this.setState({
                    state: 'error',
                    message: e.message,
                  });
                },
              );
          }}
          type="button"
          className="btn btn-block btn-default"
          style={{
            backgroundColor: '#d34836',
            border: '#d34836',
            color: 'white',
          }}
        >
          {this.props.label ? this.props.label : this.props.__('login-google.login-with-google')}
        </button>
        {this.state.state === 'error' && (
          <div className="alert alert-danger" role="alert">
            {this.state.message}
          </div>
        )}
      </div>
    );
  }
}
const Google = compose<Props, Pick<Props, 'clientId' | 'label' | 'remember'>>(
  withOoth,
  withI18n,
)(GoogleComponent);

export default Google;
