/*
 * @Author: wangshengxian
 * @Date: 2021-01-29 10:19:35
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-29 15:17:14
 * @Desc: 支付相关
 */

import request from '@/utils/request'
import Qs from 'qs'

const root = '/live'

/**
 * api提现相关 - 提现详情
 */
export function getWithdrawInfo() {
  return request({
    url: root + '/api/withdraw/withdrawal/info',
    method: 'get',
    data: {}
  })
}

/**
 * api提现相关 - 申请提现
 */
export function applyWithdraw(data) {
  return request({
    url: root + '/api/withdraw',
    method: 'post',
    data
  })
}

/**
 * cny充值管理 - cny充值信息
 */
export function getRechargeUserInfo() {
  return request({
    url: root + '/api/cny/recharge/user/info',
    method: 'get',
    data: {}
  })
}

/**
 * cny充值管理 - cny充值数量配置信息
 */
export function getRechargeConfig() {
  return request({
    url: root + '/api/cny/recharge/pay/config',
    method: 'get',
    data: {}
  })
}

// 我的记录 api-url
const myRecord = {
  // 钱包相关接口 - 获取充值记录
  exchange: '/api/recharge/my/record',
  // api提现相关 - 提现列表
  withdraw: '/api/withdraw/list',
  // cny充值管理 - cny充值信息
  buy: '/api/cny/recharge/detail'
}

/**
 * 我的记录
 * @param {string} type 记录list的类型
 * @param {object} data {pageNum: 1,pageSize: 10}
 */
export function getMyRecordList(type, data) {
  return request({
    url: `${root}${myRecord[type]}`,
    method: 'get',
    data
  })
}

const payApi = {
  default: {
    1: root + '/api/wechat/pay/order',
    2: root + '/api/ali/pay/order'
  },
  diy: {
    1: root + '/api/wechat/pay/order/custom',
    2: root + '/api/ali/pay/order/custom'
  }
}

/**
 * 获取支付url
 */
function getPayUrl(key, type, data) {
  let url = payApi[key][type]
  if (key === 'default') {
    url = `${url}/${data.id}`
  } else {
    url = `${url}?${Qs.stringify(data)}`
  }
  return url
}

/**
 * 购买TST支付
 * @param {string} key 购买方式：default默认购买；diy自定义购买
 * @param {number} type 支付方式：1微信; 2支付宝
 */
export function generalPay(key, type, data) {
  return request({
    url: getPayUrl(key, type, data),
    method: 'post',
    data: {}
  })
}
