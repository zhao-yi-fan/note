<template>
  <div id="app">
    首页
    <router-link to="/">bar</router-link>
    <router-link to="/foo">foo</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  components: {
  },
}
</script>
<style lang="css" scoped>

</style>
