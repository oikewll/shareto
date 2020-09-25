# 分享社交平台插件封装

> 兼容ES6以及低版本ES5，基于babel build/minify；

## 安装
```
$ npm install shareto -S
```

#### CDN引入
```
<script src="dist/index.min.js"></script>

<script>
var Instance = new Share({
	...
})
</script>
```

## 使用
```
import Share from 'shareto';

// app mounted前先初始化配置，譬如定义签名地址、是否开启debug，看配置方式，nuxtjs可以放在plugins目录或者全局入口统一，可以注入到全局实例
const Instance = new Share({
    debug: false,
    signurl: {SIGNURL},
    shareThumb: 'https://pubfe.aostatic.com/assets/imgs/panasia-logo.jpg'
});

// 在需要调用分享的页面
Instance.run({
	title: {TITLE},
	desc:  {DESC}
})
```

## 配置参数
```
 * @param {String} title 分享显示的标题
 * @param {String} desc 分享显示的页面详情介绍
 * @param {String} shareThumb 分享显示的缩略图
 * @param {String} signurl 签名地址
 * @param {Boolean} debug 开启debug模式，会在签名后alert显示config配置
```

## 版本日志
#### v1.0.0

- 初始化使用

## 已应用

![泛亚新闻](https://pubfe.aostatic.com/assets/imgs/panasia-logo.jpg)