import Vue from 'vue'
import VueRouter from 'vue-router'

// 模块自动化导入
const modulesFiles = require.context('./modules', false, /\.js$/)

const modulesRouters = modulesFiles.keys().reduce((total, curr) => {
  // console.log(total, curr)
  const value = modulesFiles(curr)
  // console.log('-value-', value)
  return total.concat(value.default)
}, [])

Vue.use(VueRouter)

const routes = [{ path: '/', redirect: '/index' }, ...modulesRouters]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
