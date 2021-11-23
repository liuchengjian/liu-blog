
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import api from './common/api'
import './style/global.scss'
Vue.prototype.$api = api
App.mpType = 'app'
//注册过滤器最佳事件
import * as filters from './filters'
Object.keys(filters).forEach(key=>{
	Vue.filter(key,filters[key]);
});


const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif