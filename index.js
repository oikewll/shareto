/**
 * 分享社交的插件统一注入，区分微信、qq、微博
 * 如果要做成通用插件，config配置的params参数要单独抽出外部引用
 * @param {String} title 分享显示的标题
 * @param {String} desc 分享显示的页面详情介绍
 * @param {String} shareThumb 分享显示的缩略图
 * @param {String} signurl 签名地址
 * @param {Boolean} debug 开启debug模式，会在签名后alert显示config配置
 * @returns {void}
 */
import wx from 'weixin-js-sdk';
import axios from 'axios';

export default class Share {
	constructor(params) {
		this.params = params;
	}
	async run(arg) {
		const {
			title,
			desc,
			shareThumb = this.params.shareThumb
		} = arg;
		const {
			url = window.location.href.split('#')[0],
			debug = false
		} = this.params;

		const { data } = await this.getSignature(url);
		const { timestamp, nonceStr, appId, signature } = data.data;
		wx.config({
			debug: debug,             // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
			appId: appId,             // 必填，公众号的唯一标识
			timestamp: timestamp,     // 必填，生成签名的时间戳
			nonceStr: nonceStr,       // 必填，生成签名的随机串
			signature: signature,     // 必填，签名
			jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"] // 必填，需要使用的JS接口列表
		});
		wx.ready(() => {
			wx.onMenuShareTimeline({
				title: title,                   // 分享标题
				link: window.location.href,     // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareThumb,             // 分享图标
				success: function () {
					// 用户点击了分享后执行的回调函数
				}
			});
			wx.onMenuShareAppMessage({
				title: title,                    // 分享标题
				desc: desc,                      // 分享描述
				link: window.location.href,      // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: shareThumb,              // 分享图标
				type: "",                        // 分享类型，music、video或link，不填默认为link
				dataUrl: "",                     // 如果type是music或video，则要提供数据链接，默认为空
				success: function () {
					// 用户点击了分享后执行的回调函数
				}
			})
		})
	}
	getSignature(url) {
		return axios.get(this.params.signurl, {
			params: {
				url: url
			}
		})
	}
}