/*
 * @Author: wangshengxian
 * @Date: 2020-12-21 11:28:28
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-25 13:03:07
 * @Desc: 当前活动路由模块 - router
 */

// 真假美猴王
const MonkeyKing = () => import(/* webpackChunkName: 'monkeyKing' */ '@/views/currentActivity/2020/monkeyKing')
// 圣诞活动
const Christmas = () => import(/* webpackChunkName: 'christmas' */ '@/views/currentActivity/2020/christmas')
// 周年庆门票
const Tickets = () => import(/* webpackChunkName: 'tickets' */ '@/views/currentActivity/2021/tickets')
// 2021新年集卡活动
const NewYear = () => import(/* webpackChunkName: 'newYear' */ '@/views/currentActivity/2021/newYear')
// 2021新年集卡分享活动
const NewYearShare = () => import(/* webpackChunkName: 'newYearShare' */ '@/views/currentActivity/2021/newYearShare')
// 2021无线梦想音乐演唱会活动
const Concert = () => import(/* webpackChunkName: 'concert' */ '@/views/currentActivity/2021/concert')
// 2021 无线梦想音乐演唱会确认订单
const ConcertConfirmOrder = () =>
  import(/* webpackChunkName: 'confirmOrder' */ '@/views/currentActivity/2021/concert/confirmOrder')
// 2021 无线梦想音乐演唱会票据
const ConcertTicket = () =>
  import(/* webpackChunkName: 'concertTicket' */ '@/views/currentActivity/2021/concert/concertTicket')

const concertRouter = [
  {
    path: '/2021_concert',
    name: 'Concert',
    component: Concert,
    meta: {
      title: '无限梦想音乐演唱会 2021'
    }
  },
  {
    path: '/2021_concert_order',
    name: 'ConcertConfirmOrder',
    component: ConcertConfirmOrder,
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/2021_concert_ticket',
    name: 'ConcertTicket',
    component: ConcertTicket,
    meta: {
      title: '我的入场票据'
    }
  }
]

// 当前活动 (需要请求接口，获取数据)
const currActRouter = [
  {
    path: '/monkeyKing',
    name: 'MonkeyKing',
    component: MonkeyKing,
    meta: {
      title: '真假美猴王'
    }
  },
  {
    path: '/christmas',
    name: 'Christmas',
    component: Christmas,
    meta: {
      title: '圣诞节活动'
    }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: Tickets,
    meta: {
      title: '周年庆'
    }
  },
  {
    path: '/2021_new_year',
    name: 'NewYear',
    component: NewYear,
    meta: {
      title: '新春集卡'
    }
  },
  {
    path: '/2021_new_year_share',
    name: 'NewYearShare',
    component: NewYearShare,
    meta: {
      title: '唐僧直播 - 新春集字卡活动'
    }
  },
  ...concertRouter
]

export default currActRouter
