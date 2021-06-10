/*
 * @Author: wangshengxian
 * @Date: 2020-04-22 18:33:57
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-28 12:40:00
 * @Desc: 请求拦截
 */
import axios from 'axios'
import { Toast, Dialog } from 'vant'
import store from '@/store'
import router from '@/router'

const service = axios.create()

// request interceptor
service.interceptors.request.use(
  config => {
    config.baseURL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SERVER_URL : ''
    // config.timeout = config.timeout || 50
    config.timeout = config.timeout || 50000
    // 数据传参使用表单形式
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    if (store.state.user.accessToken) {
      // console.log('-key-', store.state.user.accessToken)
      config.headers['key'] = store.state.user.accessToken
    }
    config.headers['language'] = 0
    config.method = config.method || 'post'
    if (config.method === 'post') {
      config.data = config.data || {}
    } else if (config.method === 'get') {
      config.params = config.data || config.params
    }
    // console.log('-config-', config)
    return config
  },
  error => {
    // Do something with request error
    console.log('-req-error-', error) // for debug
    Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    // console.log('-res-', res)
    if (+res.code == 200) {
      return res
    }
    Toast({
      message: res.msg,
      duration: 2000
    })
    return Promise.reject(res)
  },
  error => {
    handleResError(error)
    return Promise.reject(error)
  }
)

// 响应错误处理函数
function handleResError(error) {
  // TODO 服务器繁忙，可能是key值不对
  // 超时/响应失败，系统故障
  console.log('_RES_ERROR_', error, error.message)
  console.log(router.currentRoute.name)
  if (router.currentRoute.name === 'Index') {
    // 返回到客户端环境
    console.log('-首页-')
    return
  }
  console.log('其它页')
  Toast({
    message: 'error：' + error.message,
    duration: 2000
  })
}

export default service
