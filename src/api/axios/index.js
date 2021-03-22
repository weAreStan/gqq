import Vue from 'vue'
import axios from 'axios'
Vue.use(axios)

const request = axios.create({
  baseURL: '/api',
  timeout: 20000,
})

export default request