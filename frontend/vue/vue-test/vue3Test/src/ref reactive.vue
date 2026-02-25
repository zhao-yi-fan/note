<script setup>
import { isRef, reactive, ref, toRefs, unref } from "vue";
let count = ref(0);
const state = reactive({
  count,
});

console.log(count, "count===");
console.log(state, "state====");
console.log(state.count, "state.count====");
console.log(state.count === count.value); // true
const stateFn = () => {};
</script>

<template>
  <button @click="stateFn">state</button>
  <br />
  <span>{{ count }}</span>
  <br />
  <span>state:{{ state }}</span>
  <br />
</template>

<style></style>
