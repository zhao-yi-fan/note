import { defineClientConfig } from "@vuepress/client";
import { onMounted } from "vue";
import PlaygroundFrame from "./components/PlaygroundFrame.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("PlaygroundFrame", PlaygroundFrame);
  },
  setup() {
    onMounted(() => {
      if (typeof window !== "undefined") {
        // 只添加最大高度和滚动功能
        const style = document.createElement("style");
        style.textContent = `
          .dropdown-link__container {
            max-height: 80vh !important;
            overflow-y: auto !important;
          }
        `;
        document.head.appendChild(style);
      }
    });
  },
});
