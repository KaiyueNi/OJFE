// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import hljs from 'highlight.js'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
Vue.use(VueCodeMirror)

Vue.use(VueHighlightJS)

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})





hljs.highlightCode =   function () { //自定义highlightCode方法，将只执行一次的逻辑去掉
  let blocks = document.querySelectorAll('pre code');
  [].forEach.call(blocks, hljs.highlightBlock);
   };

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
