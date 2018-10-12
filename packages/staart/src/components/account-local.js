import React, { Component } from 'react';
import { withUser, withOoth } from 'ooth-client-react';
import { compose } from 'recompose';
import Form from './form';
import withI18n from '../hocs/i18n';

class LocalComponent extends Component {
  render() {
    return (
      <div>
        <Username />
        <Email />
        <Password />
      </div>
    );
  }
}
const Local = compose(withUser)(LocalComponent);

export default Local;

class EmailComponent extends Component {
  constructor() {
    super();
    this.state = {
      sent: false,
    };
  }
  render() {
    const { __, user } = this.props;
    console.log(user);
    const { email, verified } = user.local || {};
    return (
      <div>
        <h2>Email</h2>
        <Form
          onSubmit={() => {
            const email = this.email.value;
            this.props.oothClient
              .method('local', 'set-email', {
                email,
              })
              .then(({ message }) => {
                this.setState({
                  state: 'success',
                  message,
                });
              })
              .catch(({ message }) => {
                this.setState({
                  state: 'error',
                  message,
                });
              });
          }}
          state={this.state.state}
          message={this.state.message}
          submitLabel={email ? __('account-local.email.change-email') : __('account-local.email.set-email')}
        >
          <div className="form-group">
            <label htmlFor="email">{__('account-local.email.email')}</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="mail@example.com"
              defaultValue={email}
              ref={(email) => {
                this.email = email;
              }}
            />
          </div>
        </Form>
        {email && (
          <div>
            <h3>{__('account-local.email.email-verification')}</h3>
            <p>{verified ? __('account-local.email.verified') : __('account-local.email.not-verified')}.</p>
            {this.state.sent ? (
              <p>{__('account-local.email.verification-email-sent')}</p>
            ) : (
              !verified && (
                <button
                  onClick={() => {
                    this.props.oothClient.method('local', 'generate-verification-token').then(() => {
                      this.setState({
                        sent: true,
                      });
                    });
                  }}
                  className="btn btn-default"
                >
                  {__('account-local.email.send-verification-email')}
                </button>
              )
            )}
          </div>
        )}
      </div>
    );
  }
}
const Email = compose(
  withUser,
  withOoth,
  withI18n,
)(EmailComponent);

class UsernameFormComponent extends Component {
  constructor() {
    super();
    this.state = {
      state: null,
      message: null,
    };
  }
  render() {
    const { __, user } = this.props;
    const username = user.local && user.local.username;
    return (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const username = this.username.value;
            if (!username) {
              return;
            }
            this.props.oothClient
              .method('local', 'set-username', {
                username,
              })
              .then(({ message }) => {
                this.setState({
                  state: 'success',
                  message,
                });
              })
              .catch(({ message }) => {
                this.setState({
                  state: 'error',
                  message,
                });
              });
          }}
        >
          {this.state.state === 'success' && (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          )}
          {this.state.state === 'error' && (
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="username">{__('account-local.username.username')}</label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="hansolo"
              defaultValue={username}
              ref={(username) => {
                this.username = username;
              }}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              {__('account-local.username.username')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const Username = compose(
  withOoth,
  withUser,
  withI18n,
)(UsernameFormComponent);

class PasswordComponent extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
    };
  }
  render() {
    const { __, oothClient } = this.props;

    return (
      <div>
        <h2>Password</h2>
        <Form
          onSubmit={() => {
            const password = this.password.value;
            const newPassword = this.newPassword.value;
            const newPassword2 = this.newPassword2.value;
            if (newPassword !== newPassword2) {
              return this.setState({
                state: 'error',
                message: __('account-local.password.passwords-dont-match'),
              });
            }
            oothClient
              .method('local', 'change-password', {
                password,
                newPassword,
              })
              .then((res) => {
                this.password.value = '';
                this.newPassword.value = '';
                this.newPassword2.value = '';
                this.setState({
                  state: 'success',
                  message: res.message,
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
          submitLabel={__('account-local.password.change-password')}
        >
          <div className="form-group">
            <label htmlFor="password">{__('account-local.password.old-password-if-any')}</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="******"
              ref={(password) => {
                this.password = password;
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">{__('account-local.password.new-password')}</label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              placeholder="******"
              ref={(newPassword) => {
                this.newPassword = newPassword;
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword2">{__('account-local.password.repeat-new-password')}</label>
            <input
              type="password"
              className="form-control"
              id="newPassword2"
              placeholder="******"
              ref={(newPassword2) => {
                this.newPassword2 = newPassword2;
              }}
            />
          </div>
        </Form>
      </div>
    );
  }
}
const Password = compose(
  withOoth,
  withI18n,
)(PasswordComponent);
