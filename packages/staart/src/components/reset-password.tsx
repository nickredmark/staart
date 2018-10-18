import * as React from 'react';
import { withOoth } from 'ooth-client-react';
import { compose, Omit } from 'recompose';
import withI18n, { __ } from '../hocs/i18n';
import { OothClient } from 'ooth-client';
import Form from './form';

type ResetPasswordProps = {
  token: string;
  userId: string;
  __: __;
};

const ResetPasswordComponent = ({ token, userId, __ }: ResetPasswordProps) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('reset-password.reset-password')}</h1>
    <ResetPasswordForm token={token} userId={userId} />
  </div>
);
const ResetPassword = compose<ResetPasswordProps, Omit<ResetPasswordProps, '__'>>(withI18n)(ResetPasswordComponent);
export default ResetPassword;

type ResetPasswordFormProps = {
  token: string;
  userId: string;
  oothClient: OothClient;
  __: __;
};

type ResetPasswordFormState = {
  sent?: boolean;
  state?: 'error' | 'success';
  message?: string;
};

class ResetPasswordFormComponent extends React.Component<ResetPasswordFormProps, ResetPasswordFormState> {
  private password?: HTMLInputElement;
  private password2?: HTMLInputElement;

  constructor(props: ResetPasswordFormProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    const { __ } = this.props;

    if (!this.props.token) {
      return <p>{__('reset-password.no-token-specified')}</p>;
    }

    if (!this.props.userId) {
      return <p>{__('reset-password.no-userid-specified')}</p>;
    }

    if (this.state.sent) {
      return (
        <p>
          {__('reset-password.password-reset')} <a href="/login">{__('reset-password.login')}</a>{' '}
          {__('reset-password.with-new-password')}
        </p>
      );
    }

    return (
      <Form
        onSubmit={() => {
          const password = this.password!.value;
          const password2 = this.password2!.value;
          if (password !== password2) {
            console.error(__('reset-password.passwords-dont-match'));
            return;
          }
          this.props.oothClient
            .method('local', 'reset-password', {
              userId: this.props.userId,
              token: this.props.token,
              newPassword: password,
            })
            .then(() => {
              this.setState({
                sent: true,
              });
            });
        }}
        state={this.state.state}
        message={this.state.message}
        submitLabel={__('reset-password.reset-password')}
      >
        <div className="form-group">
          <label htmlFor="password">{__('reset-password.new-password')}</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="******"
            ref={(password) => {
              this.password = password!;
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">{__('reset-password.repeat-new-password')}</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="******"
            ref={(password2) => {
              this.password2 = password2!;
            }}
          />
        </div>
      </Form>
    );
  }
}
const ResetPasswordForm = compose<ResetPasswordFormProps, Omit<ResetPasswordFormProps, 'oothClient' | '__'>>(
  withOoth,
  withI18n,
)(ResetPasswordFormComponent);
