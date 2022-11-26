# 按钮

<bn-button type="primary" @click="addMessage" icon="map"
  >主要的</bn-button
>
<bn-button type="danger" @click="addMessage" :loading="true"
  >危险的</bn-button
>
<bn-button type="warning" @click="addMessage">警告</bn-button>
<bn-button type="success" @click="addMessage">成功</bn-button>
<bn-button type="info" @click="addMessage">信息</bn-button>
<bn-button-group></bn-button-group>
<bn-icon icon="huiyikaihuitaolun"></bn-icon>


<script>
import pkg from 'bunny-ui'
const {Message} = pkg
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