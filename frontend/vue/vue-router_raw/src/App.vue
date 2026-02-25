<template>
  <div id="app">
    <router-link to="/" tag="button">Home</router-link> |
    <router-link to="/about" tag="button">About</router-link> |
    <button @click="push">push aboutA</button>
    <hr>
    <router-view />
  </div>
</template>
<script>
export default {
  methods:{
    push(){
      this.$router.push('/about/a')
    }
  },
  mounted () {
  }
}
</script>
<style>
</style>
