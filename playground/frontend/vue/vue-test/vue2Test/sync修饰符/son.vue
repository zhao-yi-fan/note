<template>
  <div>
    子：{{ title }}
    <button @click="change">修改</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: Number,
    },
  },
  methods: {
    change() {
      this.$emit("update:title", 300);
    },
  },
};
</script>

<style></style>
