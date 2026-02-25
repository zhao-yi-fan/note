<script setup>
import { isRef, reactive, ref, toRef, toRefs, unref } from "vue";
const option = ref({
  count: 1,
});

const obj = reactive({
  info: {
    a: 1,
  },
  // option,
});

console.log(obj);
setTimeout(() => {
  Object.assign(obj.info, { c: 1 });
  console.log(obj);
  console.log(option);
  // console.log(obj.option === option);
  // obj.option.count = 2;

  // obj.info.c = 2;
}, 2000);
</script>

<template>
  <span>state:{{ obj }}</span>
</template>
