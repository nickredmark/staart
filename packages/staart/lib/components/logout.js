'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _oothClientReact = require('ooth-client-react');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => _react2.default.createElement(
    'div',
    { className: 'container' },
    _react2.default.createElement(
        'h1',
        null,
        'Log out'
    ),
    _react2.default.createElement(Logout, null)
);

class LogoutComponent extends _react.Component {
    componentDidMount() {
        if (this.props.user) {
            this.props.oothClient.logout();
        }
    }
    render() {
        if (this.props.user) {
            return _react2.default.createElement(
                'p',
                null,
                'Logging you out...'
            );
        } else {
            return _react2.default.createElement(
                'p',
                null,
                'Good bye!'
            );
        }
    }
}
const Logout = (0, _recompose.compose)(_oothClientReact.withOoth, _oothClientReact.withUser)(LogoutComponent);