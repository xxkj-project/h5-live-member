// 不在需要的页面

const notNeedRouter = [
  {
    path: '/myTeam',
    name: 'MyTeam',
    component: () => import('@/views/notNeed/myTeam'),
    meta: {
      title: '我的团队'
    }
  },
  {
    path: '/withdrawRecord',
    name: 'WithdrawRecord',
    component: () => import(/* webpackChunkName: 'withdrawRecord' */ '@/views/notNeed/withdrawRecord'),
    meta: {
      title: '提现记录'
    }
  },

  {
    path: '/diviRule',
    name: 'DiviRule',
    component: () => import(/* webpackChunkName: 'diviRule' */ '@/views/notNeed/diviRule'),
    meta: {
      title: '规则'
    }
  }
]

export default notNeedRouter
