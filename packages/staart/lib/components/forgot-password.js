'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _oothClientReact = require('ooth-client-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ForgotPassword = () => _react2.default.createElement(
    'div',
    { style: {
            maxWidth: '300px',
            margin: 'auto'
        } },
    _react2.default.createElement(
        'h1',
        null,
        'Forgot password'
    ),
    _react2.default.createElement(ForgotPasswordForm, null),
    _react2.default.createElement(
        'p',
        null,
        'Back to ',
        _react2.default.createElement(
            'a',
            { href: '/login' },
            'log in page'
        ),
        '.'
    )
);
exports.default = ForgotPassword;


class ForgotPasswordFormComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            sent: false,
            error: null
        };
    }
    render() {
        var _this = this;

        if (this.state.sent) {
            return _react2.default.createElement(
                'p',
                null,
                'A password reset email has been sent.'
            );
        } else {
            return _react2.default.createElement(
                'form',
                { onSubmit: (() => {
                        var _ref = _asyncToGenerator(function* (e) {
                            try {
                                e.preventDefault();
                                const username = _this.username.value;
                                const response = yield _this.props.oothClient.method('local', 'forgot-password', {
                                    username
                                });
                                _this.setState({
                                    sent: true
                                });
                            } catch (e) {
                                _this.setState({
                                    error: e.message
                                });
                            }
                        });

                        return function (_x) {
                            return _ref.apply(this, arguments);
                        };
                    })() },
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
                        'Username or Email'
                    ),
                    _react2.default.createElement('input', {
                        type: 'username',
                        className: 'form-control',
                        id: 'username',
                        placeholder: 'Username or email',
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
                        'Send reset password email'
                    )
                )
            );
        }
    }
}
const ForgotPasswordForm = (0, _oothClientReact.withOoth)(ForgotPasswordFormComponent);