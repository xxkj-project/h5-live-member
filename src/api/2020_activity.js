/*
 * @Author: wangshengxian
 * @Date: 2021-01-28 11:41:02
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:01:14
 * @Desc: 2020活动 - api
 */

import request from '@/utils/request'

const root = '/live'

// ===========美猴王活动================
/**
 * conf相关 - 美猴王活动配置信息
 */
export function getMonkeyKingConfig() {
  return request({
    url: root + '/conf/monkeyKingConfig',
    method: 'get',
    data: {}
  })
}

/**
 * 排行榜 - 美猴王活动排行
 */
export function getMonkeyKingRank(data) {
  return request({
    url: root + '/rank/monkeyKingRank',
    method: 'get',
    data
  })
}

/**
 * 直播间相关的api - 关注功能
 */
export function operateAttention(data) {
  return request({
    url: root + '/room/attention',
    method: 'get',
    data
  })
}

// ============圣诞活动=================
/**
 * 获取圣诞活动配置信息
 */
export function getChristmasConfig() {
  return request({
    url: root + '/api/activity/christmas/activity/config',
    method: 'get',
    data: {}
  })
}

/**
 * 获取圣诞中奖记录
 */
export function getChristmasList() {
  return request({
    url: root + '/api/activity/christmas/lottery/list',
    method: 'get',
    data: {}
  })
}

/**
 * 获取圣诞活动用户地址信息
 */
export function getChristmasAddress() {
  return request({
    url: root + '/api/activity/christmas/user/address',
    method: 'get',
    data: {}
  })
}

/**
 * 填写抽奖信息
 */
export function editLotteryInfo(data) {
  return request({
    url: root + '/api/activity/christmas/lottery/info',
    method: 'post',
    data
  })
}
