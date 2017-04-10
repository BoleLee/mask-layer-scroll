/**
 * polyfill document.scrollingElement
 * author: Brook <uedsky@gmail.com>
 * https://github.com/mathiasbynens/document.scrollingElement
 */
if(!document.scrollingElement) (function() {
  var element = null;
  function scrollingElement() {
    if(element) {
      return element;
    } else if(document.body.scrollTop) {
      // speed up if scrollTop > 0
      return (element = document.body);
    }
    var iframe = document.createElement('iframe');
    iframe.style.height = '1px';
    document.documentElement.appendChild(iframe);
    var doc = iframe.contentWindow.document;
    doc.write('<!DOCTYPE html><div style="height:9999em">x</div>');
    doc.close();
    var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight;
    iframe.parentNode.removeChild(iframe);
    return (element = isCompliant ? document.documentElement : document.body);
  }
  Object.defineProperty(document, 'scrollingElement', {
    'get': scrollingElement
  });
})();

/**
  * ======================== mask ========================
  * 参考：https://uedsky.com/2016-06/mobile-modal-scroll/
  * ModalHelper helpers resolve the modal scrolling issue on mobile devices
  * https://github.com/twbs/bootstrap/issues/15852
  * requires document.scrollingElement polyfill https://uedsky.com/demo/src/polyfills/document.scrollingElement.js
  */
var MaskHelperScrollTop;
var MaskHelper = {
  afterOpen: function(bodyCls) {
    MaskHelperScrollTop = document.scrollingElement.scrollTop;
    document.body.classList.add(bodyCls);
    document.body.style.top = -MaskHelperScrollTop + 'px';
    // console.log(MaskHelperScrollTop);
  },
  beforeClose: function(bodyCls) {
    document.body.classList.remove(bodyCls);
    // scrollTop lost after set position:fixed, restore it back.
    // document.scrollingElement.scrollTop = MaskHelperScrollTop;
    document.body.style.top = '0';
    document.body.scrollTop = MaskHelperScrollTop;
    // console.log(MaskHelperScrollTop);
  }
};


