// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import hljs from 'highlight.js'
import VueHighlightJS from 'vue-highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import Axios from 'axios'
import QS from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import VueCookies from 'vue-cookies'
import App from './App'



Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(VueCodeMirror,VueHighlightJS)

//设置baseURL
// Axios.defaults.baseURL = 'http://47.101.167.9:5000';

//设置token值    
// Axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//请求头
// Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 
Axios.defaults.headers.post['Content-Type'] = 'application/json'; 

//post请求时对data进行数据转换
Axios.interceptors.request.use((req) => {
  if (req.method === 'post') {
   req.data = QS.stringify(req.data);
   console.log(req.data);
  }
  return req;
}, (error) => Promise.reject(error));


Vue.prototype.$echarts = echarts
Vue.prototype.$axios = Axios


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
