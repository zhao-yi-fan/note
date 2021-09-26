---
home: true
heroText: 笔记
tagline: 笔记
features:
- title: 简洁至上
  details: 111
footer: MIT Licensed | Copyright © 2021-present zhaoyifan
---
# Hello VuePress

<aaa></aaa>
    <el-transfer
      v-model="leftValue"
      style="text-align: left; display: inline-block"
      filterable
      :left-default-checked="[2, 3]"
      :right-default-checked="[1]"
      :render-content="renderFunc"
      :titles="['Source', 'Target']"
      :button-texts="['To left', 'To right']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}',
      }"
      :data="data"
      @change="handleChange"
    >
      <template #left-footer>
        <el-button class="transfer-footer" size="small">Operation</el-button>
      </template>
      <template #right-footer>
        <el-button class="transfer-footer" size="small">Operation</el-button>
      </template>
    </el-transfer>

<script lang="ts">
  export default {
  data() {
    const generateData = (_) => {
      const data = []
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `Option ${i}`,
          disabled: i % 4 === 0,
        })
      }
      return data
    }
    return {
      data: generateData(),
      rightValue: [1],
      leftValue: [1],
      renderFunc(h, option) {
        return h('span', null, option.key, ' - ', option.label)
      },
    }
  },

  methods: {
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
    },
  },
  }
</script>