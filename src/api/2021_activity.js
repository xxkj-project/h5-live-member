/*
 * @Author: wangshengxian
 * @Date: 2021-01-28 11:41:02
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 15:09:27
 * @Desc: 2021活动 - api
 */

import request from '@/utils/request'
import Qs from 'qs'

const root = '/live'
const otherRoot = '/login'

// =============2021-01-16年会活动=================
/**
 * 年会活动--是否购买门票
 */
export function getTicketsStatus() {
  return request({
    url: root + '/api/purchase/admission/ticket/status',
    method: 'get',
    data: {}
  })
}

/**
 * 年会活动 -- 购买门票
 */
export function operateTicketsPurchase() {
  return request({
    url: root + '/api/purchase/admission/ticket',
    method: 'post',
    data: {}
  })
}

// ====================新年活动====================

/**
 * 获取 2021 春节字符合成人数
 */
export function getMergeNum() {
  return request({
    url: root + '/api/activity/spring/word/merge/num',
    method: 'get',
    data: {}
  })
}

/**
 * 获取 2021 春节集字抽奖详情
 */
export function getWordInfo() {
  return request({
    url: root + '/api/activity/spring/word/info',
    method: 'get',
    data: {}
  })
}

/**
 * 2021 春节集字合并
 */
export function operateWordMerge() {
  return request({
    url: root + '/api/activity/spring/word/merge',
    method: 'post',
    data: {}
  })
}

// =======================2021音乐会活动===========================

/**
 * 2021 查询演唱会门票是否有效
 */
export function getConcertData({ ticket }) {
  return request({
    url: `${root}/concert/ticket/${ticket}`,
    method: 'get',
    data: {}
  })
}

/**
 * 音乐演唱会支付 api
 */
const concertPayApi = {
  1: root + '/api/wechat/pay/concert',
  2: root + '/api/ali/pay/concert',
  3: root + '/concert/buy/tst'
}

/**
 * 演唱会门票购买
 */
export function concertPay(type, data) {
  return request({
    url: concertPayApi[type],
    method: 'post',
    data
  })
}
