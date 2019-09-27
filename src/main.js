import Vue from 'vue'

// import styles and element-ui
import 'normalize.css/normalize.css'; // import normalize to reset css
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // element-ui的样式需要单独引入
import '@/styles/index.scss'; // import global css
import locale from 'element-ui/lib/locale/lang/zh-CN';

// import router and store
import App from './App.vue'
import store from './store'
import router from './router'
import i18n from './i18n'

import './icons' // icon
import './permission' // permission control

import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

Vue.config.productionTip = false;
Vue.use(ElementUI, {locale});


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
