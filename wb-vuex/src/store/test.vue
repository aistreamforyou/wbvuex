<template>
  <div>
    <div>开始扔{{$store.state.count}}</div>
    <p>{{$store.getters.score}}</p>
    <button @click="add">扔一个</button>
    <button @click="addAsync">蓄力再扔</button>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data () {
    return {}
  },
  methods: {
    add(){
      this.$store.commit('increment')
    },
    addAsync(){
      this.$store.dispatch('incrementAsync')
    }
  }
}
</script>
<style scoped lang="scss">

</style>
