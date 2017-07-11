'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _oothClientReact = require('ooth-client-react');

var _recompose = require('recompose');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _head = require('../hocs/head');

var _head2 = _interopRequireDefault(_head);

var _link = require('../hocs/link');

var _link2 = _interopRequireDefault(_link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StatelessLayout = ({ title, children, page, user, toggled, setToggled, siteName, menu, userMenu, footerMessage, Head, Link }) => _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
        Head,
        null,
        _react2.default.createElement(
            'title',
            null,
            'Get Staarted!'
        ),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' })
    ),
    _react2.default.createElement(
        'div',
        { style: {
                paddingTop: '50px',
                paddingBottom: '20px'
            } },
        _react2.default.createElement(
            'nav',
            { className: 'navbar navbar-inverse navbar-fixed-top' },
            _react2.default.createElement(
                'div',
                { className: 'container' },
                _react2.default.createElement(
                    'div',
                    { className: 'navbar-header' },
                    _react2.default.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar',
                            onClick: () => {
                                setToggled(!toggled);
                            } },
                        _react2.default.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Toggle navigation'
                        ),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' }),
                        _react2.default.createElement('span', { className: 'icon-bar' })
                    ),
                    _react2.default.createElement(
                        'a',
                        { className: 'navbar-brand', href: '/' },
                        siteName
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { id: 'navbar', className: "collapse navbar-collapse" + (toggled ? ' in' : '') },
                    _react2.default.createElement(
                        'ul',
                        { className: 'nav navbar-nav navbar-right' },
                        menu.map(({ url, name, label }) => _react2.default.createElement(
                            'li',
                            { key: name, className: page === name && 'active' },
                            _react2.default.createElement(
                                Link,
                                { href: url },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    label
                                )
                            )
                        )),
                        !user && _react2.default.createElement(
                            'li',
                            { className: page === 'login' && 'active' },
                            _react2.default.createElement(
                                Link,
                                { href: '/login' },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    'Log in'
                                )
                            )
                        ),
                        !user && _react2.default.createElement(
                            'li',
                            { className: page === 'register' && 'active' },
                            _react2.default.createElement(
                                Link,
                                { href: '/register' },
                                _react2.default.createElement(
                                    'a',
                                    null,
                                    'Register'
                                )
                            )
                        ),
                        user && _react2.default.createElement(
                            Dropdown,
                            { page: page, userMenu: userMenu },
                            'Hello, ',
                            user.local.username || user.local.email
                        )
                    )
                )
            )
        )
    ),
    children,
    _react2.default.createElement(
        'footer',
        null,
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement('hr', null),
            footerMessage
        )
    )
);
exports.default = (0, _recompose.compose)(_head2.default, _link2.default, _oothClientReact.withUser, (0, _recompose.withState)('toggled', 'setToggled', false))(StatelessLayout);


const StatelessDropdown = ({ page, children, toggled, setToggled, userMenu, Link }) => _react2.default.createElement(
    'li',
    { className: 'dropdown' + (toggled && ' open') },
    _react2.default.createElement(
        'a',
        { href: '#', className: 'dropdown-toggle', 'data-toggle': 'dropdown', role: 'button', 'aria-haspopup': 'true', 'aria-expanded': 'true', onClick: () => {
                setToggled(!toggled);
            } },
        children,
        ' ',
        _react2.default.createElement('span', { className: 'caret' })
    ),
    toggled && _react2.default.createElement(
        'ul',
        { className: 'dropdown-menu' },
        userMenu.map(({ url, name, label }) => _react2.default.createElement(
            'li',
            { key: name, className: page === 'name' && 'active' },
            _react2.default.createElement(
                Link,
                { href: url },
                _react2.default.createElement(
                    'a',
                    null,
                    label
                )
            )
        ))
    )
);
const Dropdown = (0, _recompose.compose)(_link2.default, (0, _recompose.withState)('toggled', 'setToggled', false))(StatelessDropdown);