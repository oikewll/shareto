"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _weixinJsSdk = _interopRequireDefault(require("weixin-js-sdk"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Share = /*#__PURE__*/function () {
  function Share(params) {
    _classCallCheck(this, Share);

    this.params = params;
  }

  _createClass(Share, [{
    key: "run",
    value: function () {
      var _run = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(arg) {
        var title, desc, _arg$shareThumb, shareThumb, _this$params, _this$params$url, url, debug, _yield$this$getSignat, data, _data$data, timestamp, nonceStr, appId, signature;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                title = arg.title, desc = arg.desc, _arg$shareThumb = arg.shareThumb, shareThumb = _arg$shareThumb === void 0 ? this.params.shareThumb : _arg$shareThumb;
                _this$params = this.params, _this$params$url = _this$params.url, url = _this$params$url === void 0 ? window.location.href.split('#')[0] : _this$params$url, debug = _this$params.debug;
                _context.next = 4;
                return this.getSignature(url);

              case 4:
                _yield$this$getSignat = _context.sent;
                data = _yield$this$getSignat.data;
                _data$data = data.data, timestamp = _data$data.timestamp, nonceStr = _data$data.nonceStr, appId = _data$data.appId, signature = _data$data.signature;

                _weixinJsSdk["default"].config({
                  debug: debug,
                  // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                  appId: appId,
                  // 必填，公众号的唯一标识
                  timestamp: timestamp,
                  // 必填，生成签名的时间戳
                  nonceStr: nonceStr,
                  // 必填，生成签名的随机串
                  signature: signature,
                  // 必填，签名
                  jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表

                });

                _weixinJsSdk["default"].ready(function () {
                  _weixinJsSdk["default"].onMenuShareTimeline({
                    title: title,
                    // 分享标题
                    link: window.location.href,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareThumb,
                    // 分享图标
                    success: function success() {// 用户点击了分享后执行的回调函数
                    }
                  });

                  _weixinJsSdk["default"].onMenuShareAppMessage({
                    title: title,
                    // 分享标题
                    desc: desc,
                    // 分享描述
                    link: window.location.href,
                    // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: shareThumb,
                    // 分享图标
                    type: "",
                    // 分享类型,music、video或link，不填默认为link
                    dataUrl: "",
                    // 如果type是music或video，则要提供数据链接，默认为空
                    success: function success() {// 用户点击了分享后执行的回调函数
                    }
                  });
                });

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function run(_x) {
        return _run.apply(this, arguments);
      }

      return run;
    }()
  }, {
    key: "getSignature",
    value: function getSignature(url) {
      return _axios["default"].get(this.params.signurl, {
        params: {
          url: url
        }
      });
    }
  }]);

  return Share;
}();

exports["default"] = Share;