<script setup>
import { isRef, reactive, ref, toRefs, unref } from "vue";
let numRef = ref(0);
const customObj = {
  name: "张三",
  age: 18,
  hobby: ["游泳", "爬山"],
};
const state = reactive(customObj);
const stateAsRefs = toRefs(state);


const newState = {...state}
const stateFn = () => {
  // state.name = "李四";
  // state.school = "清华大学";
  // state.hobby.push('学习');
  newState.hobby.push('学习');
  console.log(customObj, "customObj===");
  console.log(state, "state===");
  console.log(stateAsRefs, "stateAsRefs===");
  console.log(newState, "newState===");
  console.log(numRef,'numRef===');
};
const stateChange = () => {
  numRef++;
};
</script>

<template>
  <button @click="stateChange">stateChange</button>
  <br />
  <button @click="stateFn">state</button>
  <br />
  <span>{{ numRef }}</span>
  <br />
  <span>customObj:{{ customObj }}</span>
  <br />
  <span>state:{{ state }}</span>
  <br />
  <span>stateAsRefs:{{ stateAsRefs }}</span>
  <br />
  <span>newState:{{ newState }}</span>
  <br />
  <span>newState.hobby:{{ newState.hobby }}</span>
  <br />
</template>

<style></style>
