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
        'Verify email'
    ),
    _react2.default.createElement(VerifyEmail, { token: token })
);

class VerifyEmailComponent extends _react.Component {
    constructor() {
        super();
        this.state = {
            verified: false
        };
    }
    componentDidMount() {
        var _this = this;

        if (!this.props.token) {
            console.error('No token specified.');
            return;
        }
        _asyncToGenerator(function* () {
            const result = yield _this.props.oothClient.method('local', 'verify', {
                token: _this.props.token
            });
            if (result.status === 'error') {
                console.error(result.message);
                _this.setState({
                    error: result.message
                });
                return;
            }
            _this.setState({
                verified: true
            });
        })();
    }
    render() {
        if (!this.props.token) {
            return _react2.default.createElement(
                'p',
                null,
                'No token specified.'
            );
        } else {
            if (this.state.error) {
                return _react2.default.createElement(
                    'p',
                    null,
                    this.state.error
                );
            } else if (this.state.verified) {
                return _react2.default.createElement(
                    'p',
                    null,
                    'Your email has been verified.'
                );
            } else {
                return _react2.default.createElement(
                    'p',
                    null,
                    'Verifying email...'
                );
            }
        }
    }
}
const VerifyEmail = (0, _oothClientReact.withOoth)(VerifyEmailComponent);