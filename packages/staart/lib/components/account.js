'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _layout = require('./layout');

var _layout2 = _interopRequireDefault(_layout);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oothClientReact = require('ooth-client-react');

var _recompose = require('recompose');

var _router = require('../hocs/router');

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const withLoginRequired = url => C => class extends _react.Component {
    componentDidMount() {
        if (!this.props.user) {
            this.props.Router.push(`/login?next=${encodeURIComponent(url)}`);
        }
    }
    render() {
        if (this.props.user) {
            return _react2.default.createElement(C, null);
        } else {
            return _react2.default.createElement(
                'p',
                null,
                'You need to log in to see this page.'
            );
        }
    }
};

const AccountComponent = () => _react2.default.createElement(
    'div',
    { style: {
            maxWidth: '300px',
            margin: 'auto'
        } },
    _react2.default.createElement(
        'h1',
        null,
        'Account'
    ),
    _react2.default.createElement(
        'h2',
        null,
        'Username'
    ),
    _react2.default.createElement(Username, null),
    _react2.default.createElement(
        'h2',
        null,
        'Email'
    ),
    _react2.default.createElement(Email, null),
    _react2.default.createElement(
        'h2',
        null,
        'Password'
    ),
    _react2.default.createElement(ChangePasswordForm, null)
);
const Account = (0, _recompose.compose)(_oothClientReact.withUser, _router2.default, withLoginRequired('/account'))(AccountComponent);
exports.default = Account;


class EmailComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            sent: false
        };
    }
    render() {
        var _this = this;

        const user = this.props.user;
        return _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
                'p',
                null,
                'Your email is ',
                _react2.default.createElement(
                    'b',
                    null,
                    user.local.email
                ),
                ' (',
                user.local.verified ? 'verified' : 'not verified',
                ').'
            ),
            this.state.sent ? _react2.default.createElement(
                'p',
                null,
                'Verification email sent.'
            ) : !user.local.verified && _react2.default.createElement(
                'button',
                { onClick: _asyncToGenerator(function* () {
                        yield _this.props.oothClient.method('local', 'generate-verification-token');
                        _this.setState({
                            sent: true
                        });
                    }), className: 'btn btn-default' },
                'Send verification email'
            )
        );
    }
}
const Email = (0, _recompose.compose)(_oothClientReact.withUser, _oothClientReact.withOoth)(EmailComponent);

class UsernameFormComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            sent: false,
            error: false
        };
    }
    render() {
        var _this2 = this;

        const user = this.props.user;
        if (this.state.sent) {
            return _react2.default.createElement(
                'p',
                null,
                'Username updated.'
            );
        } else {
            return _react2.default.createElement(
                'div',
                null,
                user.local.username ? _react2.default.createElement(
                    'p',
                    null,
                    'Your current username is ',
                    _react2.default.createElement(
                        'b',
                        null,
                        user.local.username
                    ),
                    '.'
                ) : _react2.default.createElement(
                    'p',
                    null,
                    'You haven\'t set a username yet.'
                ),
                _react2.default.createElement(
                    'form',
                    { onSubmit: e => {
                            e.preventDefault();
                            _asyncToGenerator(function* () {
                                try {
                                    const username = _this2.username.value;
                                    if (!username) {
                                        return;
                                    }
                                    const response = yield _this2.props.oothClient.method('local', 'set-username', {
                                        username
                                    });
                                    if (response.status == 'error') {
                                        console.error(response.message);
                                        return;
                                    }
                                    _this2.setState({
                                        sent: true
                                    });
                                } catch (e) {
                                    _this2.setState({
                                        error: e.message
                                    });
                                }
                            })();
                        } },
                    this.state.error && _react2.default.createElement(
                        'div',
                        { className: 'alert alert-danger', role: 'alert' },
                        this.state.error
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'label',
                            { htmlFor: 'username' },
                            'Username'
                        ),
                        _react2.default.createElement('input', {
                            type: 'username',
                            className: 'form-control',
                            id: 'username',
                            placeholder: 'hansolo',
                            ref: username => {
                                this.username = username;
                            }
                        })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'form-group' },
                        _react2.default.createElement(
                            'button',
                            { type: 'submit', className: 'btn btn-primary btn-block' },
                            'Set username'
                        )
                    )
                )
            );
        }
    }
}
const Username = (0, _recompose.compose)(_oothClientReact.withOoth, _oothClientReact.withUser)(UsernameFormComponent);

class ChangePasswordFormComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            sent: false,
            error: false
        };
    }
    render() {
        var _this3 = this;

        if (this.state.sent) {
            return _react2.default.createElement(
                'p',
                null,
                'Password updated'
            );
        } else {
            return _react2.default.createElement(
                'form',
                { onSubmit: e => {
                        _asyncToGenerator(function* () {
                            try {
                                e.preventDefault();
                                const password = _this3.password.value;
                                const newPassword = _this3.newPassword.value;
                                const newPassword2 = _this3.newPassword2.value;
                                if (newPassword !== newPassword2) {
                                    throw new Error('Passwords don\'t match.');
                                }
                                const response = yield _this3.props.oothClient.method('local', 'change-password', {
                                    token: _this3.props.token,
                                    password,
                                    newPassword
                                });
                                if (response.status === 'error') {
                                    console.error(response.message);
                                    return;
                                }
                                _this3.setState({
                                    sent: true
                                });
                            } catch (e) {
                                _this3.setState({
                                    error: e.message
                                });
                            }
                        })();
                    } },
                this.state.error && _react2.default.createElement(
                    'div',
                    { className: 'alert alert-danger', role: 'alert' },
                    this.state.error
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'password' },
                        'Old Password'
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
                        { htmlFor: 'newPassword' },
                        'New Password'
                    ),
                    _react2.default.createElement('input', {
                        type: 'password',
                        className: 'form-control',
                        id: 'newPassword',
                        placeholder: '******',
                        ref: newPassword => {
                            this.newPassword = newPassword;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'newPassword2' },
                        'Repeat the new Password'
                    ),
                    _react2.default.createElement('input', {
                        type: 'password',
                        className: 'form-control',
                        id: 'newPassword2',
                        placeholder: '******',
                        ref: newPassword2 => {
                            this.newPassword2 = newPassword2;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary btn-block' },
                        'Change password'
                    )
                )
            );
        }
    }
}
const ChangePasswordForm = (0, _oothClientReact.withOoth)(ChangePasswordFormComponent);