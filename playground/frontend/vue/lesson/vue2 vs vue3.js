/**
 *  ============================================================
 *     Vue2 → Vue3 全面升级总结（完整可复制版，含所有知识点）
 *  ============================================================
 *
 *  本文包含：
 *  - 响应式系统变化：defineProperty → Proxy
 *  - 生命周期变化（删除 beforeCreate/created）
 *  - diff 算法：Vue2 双端 diff → Vue3 PatchFlags + Block Tree
 *  - 多根节点（Fragment）
 *  - nextTick 的内部机制区别
 *  - TS 支持的增强
 *  - 预字符串化为何是 20 次以上
 *  - 删除/新增的 API
 *
 *  你可以把这段作为 Vue2 → Vue3 的系统性学习笔记。
 */



/* --------------------------------------------------------------
 * 1. 响应式系统完全重写（最大升级）
 * --------------------------------------------------------------
 *
 * Vue2 使用 Object.defineProperty
 *   - 无法监听属性新增/删除
 *   - 无法监听数组索引变化
 *   - 深层递归有性能损耗
 *   - 需要 Vue.set / Vue.delete
 *
 * Vue3 使用 Proxy（全监听）
 *   - 所有类型的操作都能监听（新增/删除/数组/Map/Set）
 *   - 不再需要 Vue.set
 *   - 性能更好，初始化更快
 *
 * 面试总结：
 *   Vue2 = 属性级监听
 *   Vue3 = 对象级监听（真正的全监听）
 */



/* --------------------------------------------------------------
 * 2. 生命周期变化（删除两个）
 * --------------------------------------------------------------
 *
 * Vue2 → Vue3 生命周期对照表：
 *
 *   beforeCreate  ❌ 删除（setup 之前执行，不再需要）
 *   created       ❌ 删除（setup 替代）
 *   beforeMount   → onBeforeMount
 *   mounted       → onMounted
 *   beforeUpdate  → onBeforeUpdate
 *   updated       → onUpdated
 *   beforeDestroy → onBeforeUnmount
 *   destroyed     → onUnmounted
 *
 * 面试总结：
 *   Vue3 用 setup 覆盖了 beforeCreate 与 created，因此它们被移除。
 */



/* --------------------------------------------------------------
 * 3. Composition API（setup）引入
 * --------------------------------------------------------------
 *
 * - 替代 mixins（逻辑分散、变量冲突）
 * - 支持函数式逻辑复用
 * - 更方便测试
 *
 * Vue3 的核心逻辑归于“组合式编程”，不是“选项式编程”。
 */



/* --------------------------------------------------------------
 * 4. 多根节点支持（Fragment）
 * --------------------------------------------------------------
 *
 * Vue2：组件模板必须只有一个根节点
 * Vue3：支持多个根节点
 *
 * <template>
 *   <header></header>
 *   <main></main>
 * </template>
 *
 * 优点：
 *   - 更符合真实 HTML 结构
 *   - 减少无意义包裹 div
 */



/* --------------------------------------------------------------
 * 5. TypeScript 支持完全重写
 * --------------------------------------------------------------
 *
 * Vue2：
 *   - TS 支持弱，需要 class API 才好用
 *
 * Vue3：
 *   - 核心使用 TS 重写
 *   - defineProps / defineEmits 自动生成类型
 *   - 更好推断 v-model / computed / emits 类型
 *
 * 总结：
 *   Vue2 = “兼容 TS”
 *   Vue3 = “为 TS 而生”
 */



/* --------------------------------------------------------------
 * 6. nextTick 内部机制：Vue2 vs Vue3
 * --------------------------------------------------------------
 *
 * Vue2：
 *   - watcher 队列驱动更新
 *   - nextTick 等待 watcher flush 完成后执行
 *
 * Vue3：
 *   - scheduler job 队列驱动更新（effect job）
 *   - nextTick 基于 Promise（microtask）
 *
 * 虽机制不同，但行为对于开发者完全一致：
 *   →“DOM 更新后执行回调”
 */



/* --------------------------------------------------------------
 * 7. 预字符串化（pre-stringify）为什么 20 次以上才启用？
 * --------------------------------------------------------------
 *
 * Vue3 对大量复用的静态节点（例如 SSR 重复渲染）做预字符串化：
 *
 *   <div>纯静态内容</div>
 *   → 编译成 "<div>纯静态内容</div>" 字符串
 *
 * 但 stringify 是有 CPU 成本的，因此：
 *
 *   - 静态节点复用 < 20 次：不划算 → 不优化
 *   - 静态节点复用 >= 20 次：开始预字符串化 → 提升巨大
 *
 * 20 次是经过大量性能基准测试得出的“最优阈值”。
 */



/* --------------------------------------------------------------
 * 8. diff 算法：Vue2 vs Vue3 的根本区别
 * --------------------------------------------------------------
 *
 * ======================
 * Vue2：双端 Diff（Double-Ended Diff）
 * ======================
 *
 * 使用四种比对：
 *   1. oldStart vs newStart
 *   2. oldEnd vs newEnd
 *   3. oldStart vs newEnd
 *   4. oldEnd vs newStart
 *
 * 若不匹配，则用 key 查找移动节点。
 *
 * 特点：
 *   - 基本是“盲 diff”，O(n)
 *   - 所有节点都要比较
 *   - 无法跳过静态节点
 *
 *
 * ======================
 * Vue3：PatchFlags + Block Tree +（必要时）双端 Diff
 * ======================
 *
 * ⭐ 核心升级：
 *
 * (1) Patch Flags（补丁标记）
 *   - 编译器告诉渲染器“哪些属性是动态的”
 *   - 只 diff 动态部分（O(1)）
 *
 * (2) Block Tree（区块树）
 *   - 只追踪动态节点
 *   - 所有静态节点完全跳过 diff
 *   - dynamicChildren 中的节点才 diff
 *
 * (3) 仍保留双端 diff（用于 children 列表）
 *   - 但已被 PatchFlag 精准指导，不再盲 diff
 *
 * 面试总结：
 *   Vue2 = 运行时盲 diff
 *   Vue3 = 编译器辅助 diff（PatchFlags + BlockTree + 必要时双端 diff）
 */



/* --------------------------------------------------------------
 * 9. 移除 / 新增的 API
 * --------------------------------------------------------------
 *
 * ❌ Vue2 被移除的内容：
 *   - filters（过滤器）
 *   - inline-template
 *   - $listeners
 *   - $children
 *   - sync 修饰符（用 v-model 替代）
 *   - beforeCreate / created
 *   - Vue.set / Vue.delete（Proxy 不需要）
 *
 * ✔ Vue3 新增的内容：
 *   - defineProps / defineEmits
 *   - defineExpose / defineModel（3.3/3.4）
 *   - Teleport
 *   - Suspense
 *   - Fragment
 *   - Reactive system API（effect, reactive, ref）
 *   - shallowRef / shallowReactive
 *   - effectScope
 */



