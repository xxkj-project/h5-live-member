import request from '@/utils/request'

const root = '/live'

/**
 * 提现记录
 */
export function getWithdrawList() {
  return request({
    url: root + '/user/cash/withdrawal/record',
    method: 'get',
    data: {}
  })
}
