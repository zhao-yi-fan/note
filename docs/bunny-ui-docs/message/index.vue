<template>
  <bn-button type="primary" @click="addMessage">提示</bn-button>
</template>
<script setup>
import pkg from "bunny-ui";
const { Message } = pkg;
function addMessage() {
  Message.success({
    message: "文本文本",
    duration: 3000,
  });
}
</script>
