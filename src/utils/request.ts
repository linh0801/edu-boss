import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
const request = axios.create({
  // 配置选项
  // baseURL,
  // timeout
})
// 跳转到登录
const redirectLogin = () => {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
// 刷新token
const refreshToken = () => {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 全局配置token
  config.headers.Authorization = store.state.user?.access_token
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 控制刷新状态
let isRefreshing = false
// 存储返回401 的失败请求
let requests: (() => void)[] = []
// 响应拦截器
// Add a response interceptor
request.interceptors.response.use(function (response) {
  // 状态码为 2xx 触发这个回调函数
  // 如果是项目自定义的状态码，错误的处理方法写到这里
  return response
}, async function (error) {
  // 状态码超出 2xx 会触发此处的回调
  // 如果使用的是http 的错误状态码，错误的处理方法写到这里
  // console.dir(error)
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // 请求发出去了，服务器返回了超出2xx 的状态码
    const { status } = error.response
    switch (status) {
      case 400:
        Message.error('请求参数出错')
        break
      case 401:
        // token 无效 （无token， token无效， token 过期）
        // 处理token 过期的基本流程
        // store 容器中没有用户，跳转到登录
        if (!store.state.user) {
          redirectLogin()
          return Promise.reject(error)
        }
        // 若有refresh_token ,则尝试使用refresh_token 获取新的token
        if (!isRefreshing) {
          isRefreshing = true // 开启刷新状态
          return refreshToken().then((res) => {
            if (!res.data.success) {
              throw new Error('刷新Token失效')
            }
            // 刷新token 成功了-》 重新发起本次失败的请求
            // 更新store 中存储的access_token
            store.commit('setUser', res.data.content)
            // 将挂起的请求，重新发起
            requests.forEach(cb => cb())
            // 清空数组
            requests = []
            // 重新发起请求,并将结果返回给调用者
            return request(error.config)
          }).catch((err) => {
            // 刷新token 失败了 -》 跳转登录页面，重新登录获取token
            // 把当前登录用户清空
            store.commit('setUser', null)
            redirectLogin()
            return Promise.reject(err)
          }).finally(() => {
            // 重置刷新状态
            isRefreshing = false
          })
        }
        // 等待token刷新时，将请求挂起存储起来
        return new Promise(resolve => {
          requests.push(() => {
            resolve(request(error.config))
          })
        })
        // 若没有refresh_token， 则直接跳转到登录页
        break
      case 403:
        Message.error('没有权限，请联系管理员')
        break
      case 404:
        Message.error('请求资源不存在')
        break
      default:
        Message.error('服务端出现异常，请联系管理员')
        break
    }
  } else if (error.request) {
    // 请求发出去但是没有收到服务器的返回信息
    console.log(error.request)
  } else {
    // 设置的请求参数发生了错误
    console.log('Error', error.message)
  }
  // console.log(error.config)
  // 把请求失败的对象继续抛出给上一个调用者
  return Promise.reject(error)
})
export default request
