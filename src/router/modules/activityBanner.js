/*
 * @Author: wangshengxian
 * @Date: 2020-12-21 11:33:03
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-02-01 10:35:24
 * @Desc: 唐僧直播首页-热门-轮播图链接路由
 */

const rollPageRouter = [
  {
    path: '/activityContent',
    name: 'ActivityContent',
    component: () => import('@/views/activity/roll/activityContent'),
    meta: {
      title: '活动内容'
    }
  },
  {
    path: '/gameStrategy',
    name: 'GameStrategy',
    component: () => import('@/views/activity/roll/gameStrategy'),
    meta: {
      title: '玩法攻略'
    }
  },
  {
    path: '/feature',
    name: 'LiveFeature',
    component: () => import('@/views/activity/roll/liveFeature'),
    meta: {
      title: '直播特色'
    }
  },
  {
    path: '/optimize',
    name: 'LiveUpdate',
    component: () => import('@/views/activity/roll/liveUpdate'),
    meta: {
      title: '功能优化'
    }
  },
  {
    path: '/2021_new_year_poster',
    name: 'ActivityPoster',
    component: () => import(/* webpackChunkName: 'newYearPoster' */ '@/views/activity/roll/newYearPoster'),
    meta: {
      title: ''
    }
  },
  {
    path: '/ticketRanking',
    name: 'TicketRanking',
    component: () => import(/* webpackChunkName: 'ticketRanking' */ '@/views/activity/roll/ticketRanking'),
    meta: {
      title: '年会贡献榜'
    }
  }
]

const notRollPageRouter = [
  {
    path: '/recruitHost',
    name: 'RecruitHost',
    component: () => import('@/views/activity/notRoll/recruitHost'),
    meta: {
      title: ''
      // title: '主播招募'
    }
  },
  {
    path: '/affiche',
    name: 'Affiche',
    component: () => import('@/views/activity/notRoll/affiche'),
    meta: {
      title: ''
    }
  },
  {
    path: '/rechargeCourse',
    name: 'RechargeCourse',
    component: () => import(/* webpackChunkName: 'rechargeCourse' */ '@/views/activity/notRoll/rechargeCourse'),
    meta: {
      title: '充值教程'
    }
  },
  {
    path: '/versionUpdate',
    name: 'VersionUpdate',
    component: () => import(/* webpackChunkName: 'versionUpdate' */ '@/views/activity/notRoll/versionUpdate'),
    meta: {
      // title: 'APP最新版本更新'
    }
  }
]

const activityRouter = [...rollPageRouter, ...notRollPageRouter]

export default activityRouter
