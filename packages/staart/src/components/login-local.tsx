import * as React from 'react';
import { compose } from 'recompose';
import { withOoth } from 'ooth-client-react';
import withI18n, { __ } from '../hocs/i18n';
import Form from './form';
import { OothClient } from 'ooth-client';

type Props = {
  oothClient: OothClient;
  __: __;
};

type State = {
  state?: 'error' | 'success';
  message?: string;
};

class LoginFormComponent extends React.Component<Props, State> {
  private username?: HTMLInputElement;
  private password?: HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    const { __ } = this.props;
    return (
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          const username = this.username!.value;
          const password = this.password!.value;

          this.props.oothClient
            .authenticate('local', 'login', {
              username,
              password,
            })
            .then(() => {
              this.setState({
                message: __('login-local.logged-in'),
                state: 'success',
              });
            })
            .catch((e: Error) => {
              this.setState({
                state: 'error',
                message: e.message,
              });
            });
        }}
        state={this.state.state}
        message={this.state.message}
        submitLabel={__('login-local.login')}
      >
        <div className="form-group">
          <label htmlFor="username">{__('login-local.username-or-email')}</label>
          <input
            type="string"
            className="form-control"
            id="username"
            placeholder="Username"
            ref={(username) => {
              this.username = username!;
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{__('login-local.password')}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="******"
            ref={(password) => {
              this.password = password!;
            }}
          />
          <a href="/forgot-password">{__('login-local.forgot-your-password')}</a>
        </div>
      </Form>
    );
  }
}
const LoginForm = compose<Props, {}>(
  withOoth,
  withI18n,
)(LoginFormComponent);

export default LoginForm;
