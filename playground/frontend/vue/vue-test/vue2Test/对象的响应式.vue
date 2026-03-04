<template>
  <div>
    {{ obj }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      obj: {
        a: {},
      },
    };
  },
  methods: {},
  watch: {},
  mounted() {
    this.obj = {
      a: {
        b: 2,
      },
    };
    console.log(this.obj);
  },
};
</script>

<style></style>
