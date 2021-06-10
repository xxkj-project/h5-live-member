/**
 * 全局守卫
 */
import store from '@/store'

/**
 * 设置顶部状态栏高度
 */
function setStatusBarHeight(to, from) {
  if (to.query.statusBarHeight) {
    // let statusBH = platform.isAndroid ? '0' : to.query.statusBarHeight // 测试用
    let statusBH = to.query.statusBarHeight // 安卓包上正式的话，解封此代码
    // console.log('-statusBarHeight-', statusBH)
    store.commit('globalStatus/setStatusBarHeight', statusBH)
  }
}

/**
 * 存储登录状态
 */
function setLoginStatus(to, from) {
  if (to.query.key) {
    // console.log('-query-', to.query)
    let accessToken = to.query.key
    store.commit('user/setAccessToken', accessToken)
    localStorage.setItem('accessToken', accessToken)
  }
}

/**
 * 修改页面title
 */
function setDocumentTitle(to, from) {
  document.title = '' // TODO 根据具体的项目自行更改
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
}

/**
 * 跳转登录页
 */
function jumpNeedLogin(to, from) {
  if (to.query && to.query.need_login) {
    if (store.getters && !store.getters['/user/accessToken']) {
      this.toast({
        message: '去登录页',
        duration: '3000'
      })
    }
  }
}

/**
 * 设置路由跳转的name
 */
function setRouteNames(to, from) {
  let names = [to.name, from.name]
  console.log(names)
  store.commit('globalStatus/setToFromRouteNames', names)
  // storage.setItem('routeNames', names)
  return
}

/**
 * 获取地址栏 channelId 字段
 */
function setChannelId(to, from) {
  if (to.query && to.query.channelId) {
    const channelId = to.query.channelId
    console.log('-channelId-', channelId)
    store.commit('globalStatus/setChannelId', channelId)
  }
}

/**
 * 获取地址栏 sign 字段
 */
function setSign(to, from) {
  if (to.query && to.query.sign) {
    const sign = to.query.sign
    store.commit('globalStatus/setSign', sign)
  }
}

export default {
  // 设置顶部状态栏高度
  setStatusBarHeight,
  // 存储登录状态
  setLoginStatus,
  // 修改页面title
  setDocumentTitle,
  // 跳转登录页
  jumpNeedLogin,
  // 路由跳转name
  setRouteNames,
  // 获取地址栏 channelId 字段
  setChannelId,
  // 获取地址栏 sign 字段
  setSign
}
