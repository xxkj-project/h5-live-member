/*
 * @Author: wangshengxian
 * @Date: 2020-04-20 15:29:40
 * @LastEditors: wangshengxian
 * @LastEditTime: 2021-01-28 14:58:34
 * @Desc:
 */
/**
 * vconsole 调试工具
 */
;(function() {
  // console.log('-env-', process.env.NODE_ENV)
  // 开发环境下关闭调试
  const isDevelopment = process.env.NODE_ENV === 'development'
  if (isDevelopment) return
  // 生产环境下关闭调试
  const isOnLine = process.env.NODE_ENV === 'production' && process.env.VUE_APP_SERVER_ENV === 'prod'
  if (isOnLine) return
  // 动态引入 Chunk分离
  import(/* webpackChunkName: "vconsole" */ 'vconsole').then(res => {
    let VConsole = res.default
    new VConsole()
  })
})()
