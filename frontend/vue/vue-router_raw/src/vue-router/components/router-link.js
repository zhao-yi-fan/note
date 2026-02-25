export default {
  name: 'router-link',
  props: {
    to: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  render (h) { // _c
    let tag = this.tag;
    return <tag onClick={() => {
      this.$router.push(this.to)
    }}>{this.$slots.default}</tag>
    /* return h(this.tag, {
      on: {
        click: () => {
          this.$router.push(this.to)
        }
      }
    }, this.$slots.default) */
  }
}