/**
 * 用户相关 - store
 */

const state = {
  accessToken: localStorage.getItem('accessToken') || '',
  userDetail: {}
}

const getters = {
  accessToken(state) {
    return state.accessToken
  }
}

const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken
  },
  userInfo(state, user) {
    state.userDetail = user
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
