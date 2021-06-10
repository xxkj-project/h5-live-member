import request from '@/utils/request'
import Qs from 'qs'

const root = '/live'
const rootLogin = '/login'

/**
 * 获取会员中心首页用户数据
 */
export function getUserInfoData() {
  return request({
    url: `${root}/user/ts/info`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取邀请分红
 */
export function getInviteConsumeData() {
  return request({
    url: `${root}/user/invite/consume`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取主播分红
 */
export function getAnchorBonusData() {
  return request({
    url: `${root}/user/invite/revenue`,
    method: 'get',
    data: {}
  })
}

/**
 * 消费挖矿
 */
export function getMiningList() {
  return request({
    url: root + '/user/consume/mining',
    method: 'get',
    data: {}
  })
}

/**
 * 获取我的团队收益数据
 */
export function getMyTeamData() {
  return request({
    url: `${root}/user/my/team`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取充值地址
 * @param {string} type 币种类型
 */
export function getRechargeAddress(type) {
  return request({
    url: `${root}/api/recharge/info/${type}`,
    method: 'get',
    data: {}
  })
}

/**
 * 获取任务信息
 */
export function getTaskInfoData() {
  return request({
    url: `${root}/task/info`,
    method: 'get',
    data: {}
  })
}

/**
 * 任务tst提现
 */
export function withdrawTst() {
  return request({
    url: root + '/task/cash/withdrawal',
    method: 'post',
    data: {}
  })
}

// 领取任务奖励 api
const taskApi = {
  // 签到领取
  signIn: '/task/signIn',
  // 评论回复
  comment: '/task/comment',
  // 邀请好友
  invite: '/task/invite',
  // 时间签到
  time: '/task/time/signIn',
  // 打赏领取
  reward: '/task/reward'
}

/**
 * 任务接口
 * @param {string} type 任务类型：签到-signIn；评论-comment；邀请好友-invite；时间签到-time；打赏领取-reward
 */
export function operateTask(type) {
  return request({
    url: root + taskApi[type],
    method: 'post',
    data: {}
  })
}

/**
 * 提交邀请码
 */
export function submitInviteCode(data) {
  return request({
    url: rootLogin + '/user/invite' + '?' + Qs.stringify(data),
    method: 'post',
    data: {}
  })
}
