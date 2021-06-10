const data = {
  earning: [
    {
      id: '1231231312',
      createTime: '2020-10-10 14:01',
      tf: '98.00',
      type: '直邀奖励'
    },
    {
      id: '4153151521',
      createTime: '2020-10-10 14:01',
      tf: '98.00',
      type: '分享奖励'
    },
    {
      id: '21421515',
      createTime: '2020-10-10 14:01',
      tf: '98.00',
      type: '拓展奖励'
    },
    {
      id: '3221414',
      createTime: '2020-10-10 14:01',
      tf: '98.00',
      type: '直邀奖励'
    },
    {
      id: '215211351',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '分享奖励'
    },
    {
      id: '2141212412',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '拓展奖励'
    },
    {
      id: '2141241421',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '直邀奖励'
    },
    {
      id: '325325143',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '分享奖励'
    },
    {
      id: '351533151251',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '拓展奖励'
    },
    {
      id: '35151111241',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '直邀奖励'
    },
    {
      id: '3115151',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '分享奖励'
    },
    {
      id: '23415151151',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '拓展奖励'
    },
    {
      id: '124141421412',
      createTime: '2020-10-11 14:01',
      tf: '98.00',
      type: '直邀奖励'
    }
  ],
  invite: [
    { headImg: '', name: 'ado', id: '123', sexType: 1 },
    { headImg: '', name: 'dsaw', id: '234', sexType: 0 },
    { headImg: '', name: 'wasx', id: '345', sexType: 1 },
    { headImg: '', name: 'xzc', id: '456', sexType: 0 },
    { headImg: '', name: 'qax', id: '567', sexType: 0 },
    { headImg: '', name: 'vsfg', id: '678', sexType: 1 },
    { headImg: '', name: 'ade', id: '789', sexType: 1 },
    { headImg: '', name: 'dea', id: '890', sexType: 0 }
  ],
  share: [
    { headImg: '', name: '123', id: '123', sexType: 1 },
    { headImg: '', name: '234', id: '234', sexType: 0 },
    { headImg: '', name: '345', id: '345', sexType: 1 },
    { headImg: '', name: '567', id: '456', sexType: 0 },
    { headImg: '', name: '567', id: '567', sexType: 1 },
    { headImg: '', name: '678', id: '678', sexType: 0 },
    { headImg: '', name: '789', id: '789', sexType: 1 },
    { headImg: '', name: '890', id: '890', sexType: 0 }
  ],
  expand: [
    { headImg: '', name: 'ado', id: '123', sexType: 1 },
    { headImg: '', name: 'dsaw', id: '234', sexType: 0 },
    { headImg: '', name: 'wasx', id: '345', sexType: 1 },
    { headImg: '', name: 'xzc', id: '456', sexType: 0 },
    { headImg: '', name: 'qax', id: '567', sexType: 1 },
    { headImg: '', name: 'vsfg', id: '678', sexType: 0 },
    { headImg: '', name: 'ade', id: '789', sexType: 1 },
    { headImg: '', name: 'dea', id: '890', sexType: 0 }
  ]
}
export function getData(type) {
  return {
    pickerTime: '2020-10',
    totalTF: '500',
    list: data[type]
  }
}
