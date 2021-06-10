const memberRouter = [
  {
    path: '/index',
    name: 'Index',
    component: () => import(/* webpackChunkName: 'index' */ '@/views/memberCenter'),
    meta: {
      title: '会员中心'
    }
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    component: () => import(/* webpackChunkName: 'withdraw' */ '@/views/memberCenter/withdraw'),
    meta: {
      title: '提现'
    }
  },
  {
    path: '/withdrawResult',
    name: 'WithdrawResult',
    component: () => import(/* webpackChunkName: 'withdrawResult' */ '@/views/memberCenter/withdraw/result'),
    meta: {
      title: '结果详情'
    }
  },
  {
    path: '/inviteDivi',
    name: 'InviteDivi',
    component: () => import(/* webpackChunkName: 'inviteDivi' */ '@/views/memberCenter/inviteDivi'),
    meta: {
      title: '邀请分红'
    }
  },
  {
    path: '/anchorDivi',
    name: 'AnchorDivi',
    component: () => import(/* webpackChunkName: 'anchorDivi' */ '@/views/memberCenter/anchorDivi'),
    meta: {
      title: '主播分红'
    }
  },
  {
    path: '/expenseMining',
    name: 'ExpenseMining',
    component: () => import(/* webpackChunkName: 'expenseMining' */ '@/views/memberCenter/expenseMining'),
    meta: {
      title: '消费挖矿体系'
    }
  },
  {
    path: '/task',
    name: 'Task',
    component: () => import(/* webpackChunkName: 'task' */ '@/views/memberCenter/task'),
    meta: {
      title: '任务'
    }
  },
  {
    path: '/inviteCode',
    name: 'InviteCode',
    component: () => import('@/views/memberCenter/inviteCode'),
    meta: {
      title: '邀请码'
    }
  },
  {
    path: '/myWallet',
    name: 'MyWallet',
    component: () => import(/* webpackChunkName: 'myWallet' */ '@/views/memberCenter/myWallet'),
    meta: {
      title: '我的钱包'
    }
  },
  {
    path: '/recharge',
    name: 'Recharge',
    component: () => import(/* webpackChunkName: 'recharge' */ '@/views/memberCenter/recharge'),
    meta: {
      title: '充值币种'
    }
  },
  {
    path: '/rechargeAddress',
    name: 'RechargeAddress',
    component: () => import(/* webpackChunkName: 'rechargeAddress' */ '@/views/memberCenter/recharge/rechargeAddress'),
    meta: {
      title: '充值地址'
    }
  },
  {
    path: '/rechargeBuy',
    name: 'RechargeBuy',
    component: () => import(/* webpackChunkName: 'rechargeBuy' */ '@/views/memberCenter/recharge/rechargeBuy'),
    meta: {
      title: '购买充值'
    }
  },
  {
    path: '/rechargeOptions',
    name: 'RechargeOptions',
    component: () => import(/* webpackChunkName: 'rechargeOptions' */ '@/views/memberCenter/recharge/rechargeOptions'),
    meta: {
      title: '充值选择'
    }
  },
  {
    path: '/rechargeOrder',
    name: 'RechargeOrder',
    component: () => import(/* webpackChunkName: 'rechargeOrder' */ '@/views/memberCenter/rechargeOrder'),
    meta: {
      title: '我的记录'
    }
  }
]

export default memberRouter
