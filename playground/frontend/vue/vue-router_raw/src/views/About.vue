<template>
  <div class="about">
    <h1>这是about页</h1>

    <router-link to="/about/a" tag="button">aboutA</router-link> |
    <router-link to="/about/b" tag="button">aboutB</router-link>
    
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'About',
}
</script>
