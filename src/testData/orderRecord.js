/*
 * @Author: wangshengxian
 * @Date: 2021-01-30 11:12:47
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-30 11:24:10
 * @Desc: 我的记录测试数据
 */

// 兑换记录
const topUpData = {
  currency: 'ETH',
  cash: 65.438, // TST到账
  amount: 0.005, // 充值数量
  utrate: 13087.596,
  address: 'isa8suyd9cjnd0suya6tq6g7F8Nzhaiciszh',
  orderNum: '262561651263512325616512635123362561651263512336256',
  createTime: '2020-07-01T03:24:59.873Z',
  name: '用户昵称',
  userId: 69090
}

// 提现数据
const withdrawData = {
  address: 'sdfsfsdf',
  cashNum: 188,
  createTime: '2020-07-15 16:04:45',
  currency: 'TST',
  fee: 3.76,
  feePro: 2,
  id: 17,
  myname: null,
  orderNum: 'a61c0fbc6a3c43c8a6036184ddea92dd',
  realCashNum: 184.24,
  status: 4,
  userId: 2001029
}

// 购买数据
const buyData = {
  cash: 805,
  cny: 10,
  createTime: '2021-01-30 10:34:17',
  id: 92,
  nickName: null,
  number: 100,
  orderNo: 'TS16119740572671999221AP',
  rate: 0.1,
  reward: 0,
  type: 2,
  userId: 1999221
}

function setTestData(type) {
  let result = {}
  if (type == 0) {
    result = topUpData
  } else if (type == 1) {
    result = withdrawData
  } else if (type == 2) {
    result = buyData
  } else {
  }
  return [result]
}

export function getTestData(type, pageNum, pageSize, total) {
  let res = {
    code: 200,
    data: {
      hasNext: true,
      pageNum: pageNum,
      pageSize: pageSize,
      result: [],
      totalCount: total
    },
    msg: null
  }
  res.data.result = setTestData(type)
  let len,
    count = res.data.totalCount
  len = Math.floor((count - pageNum * pageSize) / pageSize) >= 1 ? pageSize : count % pageSize
  console.log('-len-', len, '-count-', count)
  let midArr = []
  for (let i = 0; i < len; i++) {
    let mid = res.data.result[0]
    midArr.push(mid)
  }
  res.data.result = midArr
  return res
}
