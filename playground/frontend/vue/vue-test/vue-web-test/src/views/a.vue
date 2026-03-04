<template>
  <div class="aa">
    {{ obj.a }}
    {{ obj.b }}
    <button @click="onclick">点我+1</button>
    <div v-for="item in list">
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "AAA",
  data() {
    return {
      obj: {
        a: 3,
        b: 2,
      },
      list: [{ text: 1 }],
    };
  },
  methods: {
    onclick() {
      this.list.push({ text: 2 });
      console.log(this.list);
    },
  },
};
</script>
<style lang="scss">
$color: red;
.aa {
  background-color: $color;
}
</style>
