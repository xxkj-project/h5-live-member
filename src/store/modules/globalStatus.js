/**
 * 全局状态 - store
 */
const state = {
  channelId: '', //安卓上架谷歌，隐藏兑换充值字段，值为android_google 隐藏
  device: '', // 设备类型
  sign: 'app', // 环境标识(app/h5)，默认为 app
  statusBarHeight: '20', // 状态栏高度
  key: '',
  toFromRouteNames: [],
  scollTop: 0, // 滚动高度
  loadErrorCount: 0 // 加载失败次数
}

const getters = {
  statusBarHeight(state) {
    return state.statusBarHeight
  },
  scollTop(state) {
    return state.scollTop
  },
  toFromRouteNames(state) {
    return state.toFromRouteNames
  }
}

const mutations = {
  setChannelId(state, channelId) {
    state.channelId = channelId
  },
  setStatusBarHeight(state, h) {
    state.statusBarHeight = h
  },
  setScollTop(state, scollTop) {
    state.scollTop = scollTop
  },
  setSign(state, sign) {
    state.sign = sign
  },
  setToFromRouteNames(state, routeNames) {
    state.toFromRouteNames = routeNames
  },
  setLoadErrorCount(state) {
    state.loadErrorCount++
  },
  clearLoadErrorCount(state) {
    state.loadErrorCount = 0
  }
}

const actions = {}

export default {
  // 开启命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
