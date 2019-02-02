'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var axios = _axios2.default.create();
var cancelToken = _axios2.default.CancelToken;

var d = {};

var Req = function () {
    function Req(type, api, params, data) {
        var _this = this;

        (0, _classCallCheck3.default)(this, Req);
        this.u = null;
        this.cancel = null;
        this.promise = null;

        this.u = type + '&' + api.url;

        this.promise = new _promise2.default(function (resolve, reject) {
            var apiUrl = parseUrl(api.url, params);
            var config = formatConfig(api);
            config.cancelToken = new cancelToken(function (c) {
                //必须在config中设置cancelToken，才可取消请求
                _this.cancel = c;
            });
            var axiosAgr = [apiUrl, data, config];
            (0, _remove3.default)(axiosAgr, function (item) {
                return !item;
            });

            return axios[type].apply(axios, axiosAgr).then(function (response) {
                return resolve(response);
            }, function (err) {
                reject(err);
            }).catch(function (error) {
                reject(error);
            });
        }).finally(function () {
            //请求响应完成（包括取消响应）
            console.log(d[_this.u], _this, d[_this.u] === _this);
        });
    }

    (0, _createClass3.default)(Req, [{
        key: 'cancelRequest',
        value: function cancelRequest() {
            console.log(this.cancel);
            this.cancel('取消过期请求！！！');
        }
    }]);
    return Req;
}();

/**
 * 保留最后一次的请求
 * @param {string} url 
 */


function handleReqLast(type, api, params, data) {
    var u = type + '&' + api.url;
    console.log(d[u], 'd[u]');
    if (d[u]) {
        d[u].cancelRequest();
    }

    d[u] = new Req(type, api, params, data);

    return d[u].promise;
}

/**
 * 保留第一次的请求
 * @param {string} url 
 */
function handleReq(type, api, params, data) {
    var u = type + '&' + api.url;
    if (d[u] && api.abort) {
        return _promise2.default.reject("太忙了, 只允许一个请求");
    }

    d[u] = new Req(type, api, params, data);

    return d[u].promise;
}

function formatConfig(api) {

    return {};
}
function parseUrl(url, params) {

    var computed = url.replace(/\$\{(\w+)\}/g, function (match, key) {
        return params[key];
    });
    return computed;
}

var Methods = function () {
    function Methods(moduleApi) {
        (0, _classCallCheck3.default)(this, Methods);

        this.moduleApi = moduleApi;
    }

    (0, _createClass3.default)(Methods, [{
        key: 'get',
        value: function get(apiKey, params) {
            var api = this.moduleApi[apiKey];
            return handleReqLast('get', api, params);
            // return api.abort==='after'?handleReqLast('get', api, params):handleReq('get', api, params)
        }
    }, {
        key: 'post',
        value: function post(apiKey, params, data) {}
    }, {
        key: 'put',
        value: function put(apiKey, params, data) {}
    }, {
        key: 'delete',
        value: function _delete(apiKey, params) {}
    }]);
    return Methods;
}();

exports.default = Methods;
// export {
//     axios
// }