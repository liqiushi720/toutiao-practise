import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式
import './styles/index.less'
// 注册Vant组件
import Vant from 'vant'
// 导入Vant的css样式
import 'vant/lib/index'
// 导入淘宝flexible
import 'amfe-flexible'
Vue.config.productionTip = false
Vue.use(Vant)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
