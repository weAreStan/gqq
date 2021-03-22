import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from './router'
import echarts from 'echarts'
import './utils/mock'
Vue.prototype.$echarts = echarts
Vue.use(Antd);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')