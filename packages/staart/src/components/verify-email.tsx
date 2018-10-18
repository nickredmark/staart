import * as React from 'react';
import { withOoth } from 'ooth-client-react';
import withI18n, { __ } from '../hocs/i18n';
import { compose, Omit } from 'recompose';
import { OothClient } from 'ooth-client';

type Props = {
  __: __;
  token: string;
  userId: string;
};

const VerifyEmailComponent = ({ __, token, userId }: Props) => (
  <div
    style={{
      maxWidth: '300px',
      margin: 'auto',
    }}
  >
    <h1>{__('verify-email.verify-email')}</h1>
    <VerifyEmailForm token={token} userId={userId} />
  </div>
);
const VerifyEmail = compose<Props, Omit<Props, '__'>>(withI18n)(VerifyEmailComponent);
export default VerifyEmail;

type VerifyEmailFormProps = {
  token: string;
  userId: string;
  oothClient: OothClient;
  __: __;
};

type VerifyEmailFormState = {
  verified?: boolean;
  state?: 'error' | 'success';
  message?: string;
};

class VerifyEmailFormComponent extends React.Component<VerifyEmailFormProps, VerifyEmailFormState> {
  constructor(props: VerifyEmailFormProps) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const { __ } = this.props;
    if (!this.props.token) {
      console.error(__('verify-email.no-token-specified'));
      return;
    }
    if (!this.props.userId) {
      console.error(__('verify-email.no-userid-specified'));
    }
    this.props.oothClient
      .method<{ message: string }>('local', 'verify', {
        token: this.props.token,
        userId: this.props.userId,
      })
      .then(({ message }) => {
        this.setState({
          message,
          verified: true,
          state: 'success',
        });
      })
      .catch((e) => {
        this.setState({
          state: 'error',
          message: e.message,
        });
      });
  }

  render() {
    const { __ } = this.props;

    if (!this.props.token) {
      return <p>{__('verify-email.no-token-specified')}</p>;
    } else if (!this.props.userId) {
      return <p>{__('verify-email.no-userid-specified')}</p>;
    } else {
      if (this.state.state === 'error') {
        return <p>{this.state.message}</p>;
      } else if (this.state.verified) {
        return <p>{__('verify-email.email-verified')}</p>;
      } else {
        return <p>{__('verify-email.verifying-email')}</p>;
      }
    }
  }
}
const VerifyEmailForm = compose<VerifyEmailFormProps, Omit<VerifyEmailFormProps, 'oothClient' | '__'>>(
  withOoth,
  withI18n,
)(VerifyEmailFormComponent);
