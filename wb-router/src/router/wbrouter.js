// 实现插件
// url变化监听
// 路由配置解析
// 实现全局组件
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld'
class VueRouter {
  constructor (options) {
    this.$options = options
    this.routeMap = {}
    // 路由响应式
    this.app = new Vue({
      data: {
        current: '/'
      }
    })
  }
  // 初始化
  init () {
    this.bindEvents()// 监听url变化
    this.createRouteMap(this.$options)// 解析路由配置
    this.initComponent()// 实现两个组件
  }
  // 监听url变化
  bindEvents () {
    window.addEventListener('load', this.onHashChange.bind(this))
    window.addEventListener('hashchange', this.onHashChange.bind(this))
  }
  // 哈希值变化
  onHashChange () {
    this.app.current = window.location.hash.slice(1) || '/'
  }
  // 创建路由映射表
  createRouteMap (options) {
    options.routes.forEach(item => {
      this.routeMap[item.path] = item.component
    })
  }
  // 组件初始化
  initComponent () {
    Vue.component('router-link', {
      props: {to: String},
      render (h) {
        return h('a', {attrs: {href: '#' + this.to}}, [
          this.$slots.default
        ])
      }
    })
    // <router-view></router-view>
    Vue.component('router-view', {
      render: h => {
        const comp = this.routeMap[this.app.current]
        return h(comp)
      }
    })
  }
}
VueRouter.install = function (Vue) {
  Vue.mixin({
    beforeCreate () {
      // this是vue实例
      if (this.$options.router) {
        // 仅在根组件执行一次
        Vue.prototype.$router = this.$options.router
        this.$options.router.init()
      }
    }
  })
}
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/', component: HelloWorld}
  ]
})
