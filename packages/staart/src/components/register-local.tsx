import * as React from 'react';
import { withOoth } from 'ooth-client-react';
import { compose } from 'recompose';
import withI18n, { __ } from '../hocs/i18n';
import Form from './form';
import { OothClient } from 'ooth-client';

type Props = {
  __: __;
  oothClient: OothClient;
};

type State = {
  state?: 'error' | 'success';
  message?: string;
};

class RegisterFormComponent extends React.Component<Props, State> {
  private email?: HTMLInputElement;
  private password?: HTMLInputElement;

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    const { __ } = this.props;
    return (
      <Form
        onSubmit={() => {
          const email = this.email!.value;
          const password = this.password!.value;
          this.props.oothClient
            .method('local', 'register', {
              email,
              password,
            })
            .then(() => {
              return this.props.oothClient.authenticate('local', 'login', {
                password,
                username: email,
              });
            })
            .then(() => {
              this.setState({
                state: 'success',
                message: __('login-local.logged-in'),
              });
            })
            .catch((e) => {
              this.setState({
                state: 'error',
                message: e.message,
              });
            });
        }}
        state={this.state.state}
        message={this.state.message}
        submitLabel={__('register-local.register')}
      >
        <div className="form-group">
          <label htmlFor="email">{__('register-local.email')}</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Email"
            ref={(email) => {
              this.email = email!;
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">{__('register-local.password')}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="******"
            ref={(password) => {
              this.password = password!;
            }}
          />
        </div>
      </Form>
    );
  }
}
const RegisterForm = compose<Props, {}>(
  withOoth,
  withI18n,
)(RegisterFormComponent);

export default RegisterForm;
