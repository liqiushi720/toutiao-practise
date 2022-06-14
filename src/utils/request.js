
// 在utils目录下封装请求模块
import axios from 'axios'
export const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})
