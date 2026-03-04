import { parse } from "@vue/compiler-sfc";

const sfcSource = `
<template>
  <div class="hello">{{ msg }}</div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: { msg: String }
};
</script>

<style scoped>
.hello { color: #42b983; }
</style>
`;

const { descriptor, errors } = parse(sfcSource);

if (errors.length) {
  throw errors[0];
}

const templateContent = descriptor.template?.content ?? "";
const scriptContent = descriptor.script?.content ?? descriptor.scriptSetup?.content ?? "";
const styles = descriptor.styles.map((block) => ({
  scoped: block.scoped,
  content: block.content,
}));

console.log("template:", templateContent.trim());
console.log("script:", scriptContent.trim());
console.log("styles:", styles);
