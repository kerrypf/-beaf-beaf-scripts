'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.axios = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _convert = require('./convert.js');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var decorator = function decorator(api) {
    var ret = (0, _keys2.default)(api).reduce(function (pend, key) {
        pend[key] = new _convert2.default(api[key]);
        return pend;
    }, {});
    return ret;
};
exports.axios = _convert.axios;
exports.default = decorator;