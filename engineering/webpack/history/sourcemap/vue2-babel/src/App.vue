<script>
export default {
  data() {
    return {
      aa: "1111",
    };
  },
  mounted() {
    const a = 1;
    const b = 2;
    console.log(a.b.c);
    new Promise((resolve, reject) => {});
  },
  render() {
    // return h(
    //   "div",
    //   {
    //     style: {
    //       color: "red",
    //     },
    //     title: "div",
    //     id: "www",
    //   },
    //   123
    // );
    return <div style="color: red;" title="div">123</div>
  },
};
</script>

<style></style>
