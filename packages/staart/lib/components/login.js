'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _recompose = require('recompose');

var _oothClientReact = require('ooth-client-react');

var _router = require('../hocs/router');

var _router2 = _interopRequireDefault(_router);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const Login = ({ next }) => _react2.default.createElement(
    'div',
    { style: {
            maxWidth: '300px',
            margin: 'auto'
        } },
    _react2.default.createElement(
        'h1',
        null,
        'Log in'
    ),
    _react2.default.createElement(LoginForm, { next: next }),
    _react2.default.createElement(
        'p',
        { style: {
                textAlign: 'center'
            } },
        'or'
    ),
    _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-block btn-default', style: {
                    backgroundColor: "#3B5998",
                    border: "#3B5998",
                    color: 'white'
                } },
            'Log in with Facebook'
        )
    ),
    _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
            'button',
            { type: 'button', className: 'btn btn-block btn-default', style: {
                    backgroundColor: '#d34836',
                    border: '#d34836',
                    color: 'white'
                } },
            'Log in with Google'
        )
    ),
    _react2.default.createElement(
        'p',
        null,
        'New user? ',
        _react2.default.createElement(
            'a',
            { href: '/register' },
            'register'
        ),
        '.'
    )
);
exports.default = Login;


class LoginFormComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            error: null
        };
    }
    componentDidMount() {
        if (this.props.user) {
            this.props.Router.push(this.props.next || '/dashboard');
        }
    }
    componentDidUpdate() {
        if (this.props.user) {
            this.props.Router.push(this.props.next || '/dashboard');
        }
    }
    render() {
        var _this = this;

        if (this.props.user) {
            return _react2.default.createElement(
                'p',
                null,
                'You are logged in.'
            );
        } else {
            return _react2.default.createElement(
                'form',
                { onSubmit: (() => {
                        var _ref = _asyncToGenerator(function* (e) {
                            try {
                                e.preventDefault();
                                const username = _this.username.value,
                                      password = _this.password.value,
                                      response = yield _this.props.oothClient.authenticate('local', 'login', {
                                    username,
                                    password
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
                        type: 'string',
                        className: 'form-control',
                        id: 'username',
                        placeholder: 'Username',
                        ref: username => {
                            this.username = username;
                        }
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'password' },
                        'Password'
                    ),
                    _react2.default.createElement('input', {
                        type: 'password',
                        className: 'form-control',
                        id: 'password',
                        placeholder: '******',
                        ref: password => {
                            this.password = password;
                        }
                    }),
                    _react2.default.createElement(
                        'a',
                        { href: '/forgot-password' },
                        'Forgot your password?'
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary btn-block' },
                        'Log in'
                    )
                )
            );
        }
    }
}
const LoginForm = (0, _recompose.compose)(_router2.default, _oothClientReact.withOoth, _oothClientReact.withUser)(LoginFormComponent);