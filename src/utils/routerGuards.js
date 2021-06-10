/*
 * 路由守卫
 */
import router from '@/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import glg from './globalGuards'

// NProgress.configure({ showSpinner: false }) // 禁用进度环

router.beforeEach((to, from, next) => {
  // console.log('-router-before-', to, from)
  // first progress bar
  // NProgress.start()
  // 收集路由跳转的name值
  // glg.setRouteNames(to, from)
  // 顶部状态栏高度(setStatusBarHeight)
  glg.setStatusBarHeight(to, from)
  // 存储登录状态(setLoginStatus)
  glg.setLoginStatus(to, from)
  // 判断用户是否需要登录访问(jumpNeedLogin)
  glg.jumpNeedLogin(to, from)
  // 路由改变修改页面title(setDocumentTitle)
  glg.setDocumentTitle(to, from)
  // 获取 channelId 字段
  glg.setChannelId(to, from)
  // 获取 sign 字段
  glg.setSign(to, from)

  next()
})

router.afterEach(() => {
  // finish progress bar
  // NProgress.done()
})
