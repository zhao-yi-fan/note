<template>
  <div>
    父：{{ title }}
    <Son :title.sync="title"></Son>
  </div>
</template>

<script>
import Son from "./son.vue";
export default {
  components: {
    Son,
  },
  data() {
    return {
      title: 100,
    };
  },
};
</script>

<style></style>
