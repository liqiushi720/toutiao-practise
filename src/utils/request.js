// 在utils目录下封装请求模块
import axios from 'axios'
import store from '@/store'

export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
// 添加请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 必须判断stroe.state的两种 一是它存不存在以及它的state存不存在
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器
request.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  // console.log(error)
  if (error.response.status === 401) {
    // 如果401就捕获 重新发送请求

    const { data } = await axios({
      url: 'http://toutiao.itheima.net/v1_0/authorizations',
      method: 'PUT',
      headers: { Authorization: `Bearer ${store.state.user.refresh_token}` }
    })
    store.commit('setUser', { ...store.state.user, token: data.data.token })
    return request(error.config)
  }
  return Promise.reject(error)
})
export default request
