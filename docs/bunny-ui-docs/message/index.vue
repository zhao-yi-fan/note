<template>
  <bn-button type="primary" @click="addMessage">提示</bn-button>
</template>
<script setup>
import { Message } from "bunny-ui";
function addMessage() {
  Message.success({
    message: "文本文本",
    duration: 3000,
  });
}
</script>
