import * as React from 'react';
import { withOoth } from 'ooth-client-react';
import { compose } from 'recompose';
import withI18n, { __ } from '../hocs/i18n';
import { OothClient } from 'ooth-client';
import Form from './form';

type ForgotPasswordProps = {
  __: __;
};

const ForgotPasswordComponent = ({ __ }: ForgotPasswordProps) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('forgot-password.forgot-password')}</h1>
    <ForgotPasswordForm />
    <p>
      {__('forgot-password.back-to')} <a href="/login">{__('forgot-password.login-page')}</a>.
    </p>
  </div>
);
const ForgotPassword = compose<ForgotPasswordProps, {}>(withI18n)(ForgotPasswordComponent);
export default ForgotPassword;

type ForgotPasswordFormProps = {
  __: __;
  oothClient: OothClient;
};

type ForgotPasswordFormState = {
  sent?: boolean;
  state?: 'success' | 'error';
  message?: string;
};

class ForgotPasswordFormComponent extends React.Component<ForgotPasswordFormProps, ForgotPasswordFormState> {
  private username?: HTMLInputElement;

  constructor(props: ForgotPasswordFormProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    const { __ } = this.props;

    if (this.state.sent) {
      return <p>{__('forgot-password.password-reset-email-sent')}</p>;
    }

    return (
      <Form
        onSubmit={() => {
          const username = this.username!.value;
          this.props.oothClient
            .method<{ message: string }>('local', 'forgot-password', {
              username,
            })
            .then(({ message }) => {
              this.setState({
                message,
                sent: true,
                state: 'success',
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
        submitLabel={__('forgot-password.send-reset-password-email')}
      >
        <div className="form-group">
          <label htmlFor="username">{__('forgot-password.username-or-email')}</label>
          <input
            type="username"
            className="form-control"
            id="username"
            placeholder={__('forgot-password.username-or-email')}
            ref={(username) => {
              this.username = username!;
            }}
          />
        </div>
      </Form>
    );
  }
}
const ForgotPasswordForm = compose<ForgotPasswordFormProps, {}>(
  withOoth,
  withI18n,
)(ForgotPasswordFormComponent);
