'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _router = require('../hocs/router');

var _router2 = _interopRequireDefault(_router);

var _oothClientReact = require('ooth-client-react');

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = ({ next }) => _react2.default.createElement(
    'div',
    { style: {
            maxWidth: '300px',
            margin: 'auto'
        } },
    _react2.default.createElement(
        'h1',
        null,
        'Register'
    ),
    _react2.default.createElement(RegisterForm, { next: next }),
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
            'Register with Facebook'
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
            'Register with Google'
        )
    ),
    _react2.default.createElement(
        'p',
        null,
        'Already have an account? ',
        _react2.default.createElement(
            'a',
            { href: '/login' },
            'Log in'
        ),
        '.'
    )
);

class RegisterFormComponent extends _react.Component {
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
                { onSubmit: e => {
                        e.preventDefault();
                        const email = this.email.value,
                              password = this.password.value;

                        _asyncToGenerator(function* () {
                            const response = yield _this.props.oothClient.method('local', 'register', {
                                email,
                                password
                            });
                            const authResponse = _this.props.oothClient.authenticate('local', 'login', {
                                username: email,
                                password
                            });
                        })();
                    } },
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'label',
                        { htmlFor: 'email' },
                        'Email'
                    ),
                    _react2.default.createElement('input', {
                        type: 'email',
                        className: 'form-control',
                        id: 'email',
                        placeholder: 'Email',
                        ref: email => {
                            this.email = email;
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
                    })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'form-group' },
                    _react2.default.createElement(
                        'button',
                        { type: 'submit', className: 'btn btn-primary btn-block' },
                        'Register'
                    )
                )
            );
        }
    }
}
const RegisterForm = (0, _recompose.compose)(_router2.default, _oothClientReact.withOoth, _oothClientReact.withUser)(RegisterFormComponent);