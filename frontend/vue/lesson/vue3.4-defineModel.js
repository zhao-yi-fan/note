/**
 * vue3.4 defineModel 原理简化版（带详细注释）
 *
 * 以下内容包含了你最近问的所有关键点：
 * 1. defineModel 为什么存在？
 * 2. defineModel({ local: true }) 和 ref 有什么区别？
 * 3. local:true 是否应该从 props 读取？
 * 4. defineModel 支持多个 v-model 的原理？
 * 5. defineModel 如何处理 .trim / .number / .lazy 修饰符？
 * 6. 为什么 ref 不能替代 defineModel？
 * 7. defineModel 是如何生成 props + emits + getter + setter 的？
 * 
 * 这些问题全部写在注释里，适合集成进你的学习笔记。
 */

/**
 * defineModel 轻量源码（伪实现，与 Vue3.4 真实机制一致）
 */
function defineModel(name = "modelValue", options = {}) {
  const props = useCurrentComponentProps();   // 当前组件 props
  const emit = useCurrentComponentEmit();     // 当前组件 emit

  /**
   *⭕ 问题：local:true 时，这里还应该从 props 读取吗？
   *✔ 答案：必须从 props 读取。
   *
   * 解释：
   * local:true 的含义是“子组件修改值时不 emit 回父组件”。
   * 但父组件仍然可能通过 v-model 传入一个初始值。
   * 子组件必须能响应父组件更新。
   *
   * 因此：
   * - “子 → 父” 通道关闭（不会 emit）
   * - “父 → 子” 通道正常（继续从 props 读取）
   */
  const getValue = () => props[name];

  /**
   * setter（数据更新方向）
   * 如果 local:true，则禁止向父组件 emit 更新。
   * 这就是“内部模型（local model）”的核心。
   */
  const setValue = (newVal) => {
    if (!options.local) {
      emit(`update:${name}`, newVal);
    }
  };

  /**
   * model 实质上是一个 computed(get/set)
   * 这就是为什么 defineModel = v-model 的真正核心。
   */
  const model = computed({
    get: getValue,
    set: setValue,
  });

  /**
   * 修饰符处理（回答你的另一个问题：ref 为什么不能自动 trim？）
   * 
   * v-model.trim="xxx" 会转成：
   * { modelValueModifiers: { trim:true } }
   * 
   * defineModel 自动把这些修饰符注入 model.modifiers
   * 供组件内部使用：
   * 
   * if (model.modifiers.trim) {
   *   val = val.trim()
   * }
   */
  model.modifiers = props[`${name}Modifiers`] || {};

  return model;
}

/**
 * ===============================
 *     下面是所有问题的答案总结
 * ===============================
 */

/**
 * ❓ 为什么 defineModel 不是 ref？
 *
 * ✔ defineModel = ref + props + emits + computed + 修饰符 + 多模型
 * ref 只是“内部状态”，不参与父子 v-model 通道。
 * defineModel 是“组件级 v-model 系统”。
 */

/**
 * ❓ defineModel({ local:true }) 和 ref 有什么区别？
 *
 * local:true 的 model：
 * - 也使用 computed(get/set)
 * - 也支持 trim / number / lazy 修饰符
 * - 也能 <input v-model="model"> 自动双向绑定
 * - 也能响应父组件传入的新 props
 * 
 * ref 做不到这些，因为：
 * - ref 不参与 v-model
 * - ref 不识别修饰符
 * - ref 不会生成 props/emits
 * - ref 不会自动同步父 → 子 更新
 */

/**
 * ❓ local:true 时 getter 是否应该从 props 取值？
 *
 * ✔ 必须从 props 获取。
 *
 * local:true 只关闭 setter 的 emit，不影响 getter。
 * 
 * 父组件仍然可能改变 v-model 的值，子组件需要同步这些变化。
 * 如果 getter 不从 props 获取，则无法响应父组件更新。
 */

/**
 * ❓ defineModel 为什么能支持多个 v-model？
 *
 * 因为可以指定模型名称：
 * 
 * const title = defineModel("title")
 * const content = defineModel("content")
 *
 * 父组件：
 * <MyEditor v-model:title="t" v-model:content="c" />
 * 
 * ref 无法做到，因为 ref 不知道 emit 的事件名，也不识别多个通道。
 */

/**
 * ❓ v-model 修饰符为什么 defineModel 能识别，而 ref 不行？
 *
 * 因为修饰符被解析成 props.xxxModifiers：
 * 
 * v-model.trim="msg"
 *  → props.modelValueModifiers = { trim: true }
 *
 * 只有 defineModel 自动读取这些修饰符：
 * model.modifiers = props['modelValueModifiers']
 *
 * ref 没有这个机制。
 */

/**
 * ❓ 哪些场景需要 defineModel？
 *
 * - 自定义输入组件（Input/Select/Textarea/...）
 * - 支持 v-model 的 UI 组件
 * - 多模型组件（page/pageSize/keyword）
 * - 需要内部使用 v-model 行为（trim/number/lazy）
 * 
 * 页面级不需要 defineModel，只用 ref 就够。
 */

/**
 * ❓ defineModel 是语法糖吗？
 *
 * ✔ 是语法糖，但远超“简单糖”：
 * 它封装了 v-model 的完整协议：
 * - props
 * - emits
 * - computed(get/set)
 * - 多模型
 * - 修饰符
 * - 类型推导
 * - local 模式
 */

