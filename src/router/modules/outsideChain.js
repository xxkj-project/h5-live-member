const outsideRouter = [
  // 唐僧直播ios内测版安装教程
  {
    path: '/course',
    name: 'Course',
    component: () => import(/* webpackChunkName: 'course' */ '@/views/h5_outside_chain/course')
  },
  // 唐僧直播下载页 (暂时没有用上)
  {
    path: '/download',
    name: 'Download',
    component: () => import(/* webpackChunkName: 'download' */ '@/views/h5_outside_chain/download')
  },
  {
    path: '/inviteRegister',
    name: 'InviteRegister',
    component: () => import(/* webpackChunkName: 'inviteRegister' */ '@/views/h5_outside_chain/inviteRegister'),
    meta: {
      title: '邀请好友注册'
    }
  }
]

export default outsideRouter
