# 按钮

<bn-button @click="addMessage"></bn-button>


<script>
import {Message} from 'bunny-ui'
export default {
  methods: {
    addMessage(){
      Message.success({
        message: "文本文本",
        duration: 3000,
      });
    }
  }
}
</script>