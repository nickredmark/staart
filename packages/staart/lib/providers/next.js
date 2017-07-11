'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (Router, Link, Head) => (0, _recompose.withContext)({
    Router: _propTypes2.default.object,
    Link: _propTypes2.default.func,
    Head: _propTypes2.default.func
}, () => ({
    Router,
    Link,
    Head
}));