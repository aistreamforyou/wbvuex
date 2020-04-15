let Vue
class Store {
  constructor(options){
    this.state = new Vue({
      data: options.state
    })
    this.mutations = options.mutations || {}
    this.actions = options.actions
    options.getters && this.handleGetters(options.getters)
  }
  // 注意事项：这里使用箭头函数形式，后面actions实现时会有作用
  commit = (type, arg) => {
    this.mutations[type](this.state, arg)
  }
  dispatch(type, arg) {
    this.actions[type]({
      commit: this.commit,
      state: this.state
    }, arg)
  }
  handleGetters (getters) {
    this.getters = {}// 定义this.getters
    // 遍历getters选项，为this.getters定义property
    // 属性名就是选项中的key，只需定义get函数保证其只读性
    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => {// 注意依然是箭头函数
          return getters[key](this.state)
        }
      })
    })
  }
}

function install (_Vue) {
  Vue = _Vue
  // 这样store执行的时候，就有了Vue，不用Import
  // 这也是为了Vue.use必须在新建store之前
  Vue.mixin({
    beforeCreate () {
      // 这样才能获取到传递进来的store
      // 只有root元素才有store，所以判断一下
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

export default {Store, install}
