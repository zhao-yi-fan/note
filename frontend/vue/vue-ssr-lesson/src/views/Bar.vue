<template>
  <div @click="show"
       class="red">
    bar components
    {{$store.state.username}}
  </div>
</template>
<script>
export default {
  // 写的代码 都是异步的 全部采用promise
  // 规定只有页面级组件才能使用
  asyncData ({ store }) { // 异步数据 这个方法只在服务端执行，客户端运行时不会执行的
    return store.dispatch('set_username');
  },
  // 在服务端也可以用beforeCreate和created
  created(){
    console.log('created')
  },
  // 给客户端用
  mounted () {
    this.$store.dispatch('set_username');
  },
  methods: {
    show () {
      alert(1)
    }
  },
}
</script>
<style lang="css" scoped>
.red {
  background: red;
}
</style>



