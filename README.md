

## 滚动穿透问题 ##

当有 fixed 遮罩背景和弹出层时，在屏幕上滑动能够滑动背景下面的内容

## 解决方案 ##

在遮罩层出现时，将```body```定位设置为```position: fixed; width: 100%; ```, 遮罩层消失则恢复正常。但是还有个问题，这样关闭弹出层后，body移位了，还需要恢复其滚动位置。

移动端和PC端的滚动容器不同，移动端是 `document.body`, PC端是`document.documentElement`, 而现在通过`document.scrollingElement`可以识别到具体的滚动容器，方便移动端和PC端代码统一。

```css
body.ban-scroll { // 禁止滚动
  position: fixed;
  width: 100%;
}
```

```js
// 用于存储滚动高度的中间变量
let MaskHelperScrollTop

// 禁止滚动穿透
// 此处flag仅用于表示是否需要禁止滚动，根据实际调整即可
if (flag) {
  MaskHelperScrollTop = document.scrollingElement.scrollTop
  document.body.classList.add('ban-scroll')
} else {
  document.body.classList.remove('ban-scroll')
  document.scrollingElement.scrollTop = MaskHelperScrollTop
}
```


## 相关链接 ##

- [移动端滚动穿透问题完美解决方案](https://uedsky.com/2016-06/mobile-modal-scroll/)
- [张鑫旭：web移动端浮层滚动阻止window窗体滚动JS/CSS处理](http://www.zhangxinxu.com/wordpress/2016/12/web-mobile-scroll-prevent-window-js-css/)
- [zxx:PC端-子元素scroll父元素容器不跟随滚动JS实现](http://web.jobbole.com/84625/)
- [张鑫旭:PC端-子元素scroll父元素容器不跟随滚动JS实现 原文](http://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/)

- [【前端性能】高性能滚动 scroll 及页面渲染优化](http://www.cnblogs.com/coco1s/p/5499469.html)

- [IScroll](https://github.com/cubiq/iscroll/blob/master/src/core.js)

- [由弹出层引发对滚动原理的讨论](https://segmentfault.com/a/1190000003849952)

- [张鑫旭：浅议内滚动布局](https://isux.tencent.com/inner-scroll-layout.html)
- [scrollingElement](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/scrollingElement)
- [张鑫旭：使用document.scrollingElement控制窗体滚动高度](https://www.zhangxinxu.com/wordpress/2019/02/document-scrollingelement/)

