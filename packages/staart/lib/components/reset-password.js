'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oothClientReact = require('ooth-client-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = ({ token }) => _react2.default.createElement(
    'div',
    { style: {
            maxWidth: '300px',
            margin: 'auto'
        } },
    _react2.default.createElement(
        'h1',
        null,
        'Reset password'
    ),
    _react2.default.createElement(ResetPasswordForm, { token: token })
);

class ResetPasswordFormComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            sent: false
        };
    }
    render() {
        var _this = this;

        if (!this.props.token) {
            return _react2.default.createElement(
                'p',
                null,
                'No token specified.'
            );
        } else {
            if (this.state.sent) {
                return _react2.default.createElement(
                    'p',
                    null,
                    'Your password has been reset. ',
                    _react2.default.createElement(
                        'a',
                        { href: '/login' },
                        'Log in'
                    ),
                    ' with your new password.'
                );
            } else {
                return _react2.default.createElement(
                    'form',
                    { onSubmit: e => {
                            e.preventDefault();
                            const password = this.password.value;
                            const password2 = this.password2.value;
                            if (password !== password2) {
                                console.error('Passwords don\'t match.');
                                return;
                            }
                            _asyncToGenerator(function* () {
                                const response = yield _this.props.oothClient.method('local', 'reset-password', {
                                    token: _this.props.token,
                                    newPassword: password
                                });
                                if (response.status === 'error') {
                                    console.error(response.message);
                                    return;
                                }
                                _this.setState({
                                    sent: true
                                });
                            })();
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'password' },
                            'New Password'
                        ),
                        _react2.default.createElement('input', {
                            type: 'password',
                            className: 'form-control',
                            id: 'password',
                            placeholder: '******',
                            ref: password => {
                                this.password = password;
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'password2' },
                            'Repeat the new Password'
                        ),
                        _react2.default.createElement('input', {
                            type: 'password',
                            className: 'form-control',
                            id: 'password2',
                            placeholder: '******',
                            ref: password2 => {
                                this.password2 = password2;
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary btn-block' },
                            'Reset password'
                        )
                    )
                );
            }
        }
    }
}
const ResetPasswordForm = (0, _oothClientReact.withOoth)(ResetPasswordFormComponent);