// 公共的请求方法
import request from '@/utils/request'
import Qs from 'qs'

const root = '/live'
const otherRoot = '/login'

/**
 * conf相关 - 唐僧配置信息
 */
export function getConfigInfo() {
  return request({
    url: root + '/conf/ts',
    method: 'get',
    data: {}
  })
}

/**
 * 通过手机号验证码登录并填写邀请id
 */
export function shareRegister(data) {
  return request({
    url: otherRoot + '/user/mobileCodeAuthAndInvited' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}

/**
 * 发送短信验证码
 * @param {object} data {mobilePrefix: '+86',mobile: "18111111111",type: 1} type == 1注册 2忘记密码 3绑定手机号 4登陆
 */
export function sendMsg(data) {
  return request({
    url: otherRoot + '/common/sendMsg' + '?' + Qs.stringify(data),
    method: 'post',
    data
  })
}
