import { defineClientConfig } from "@vuepress/client";
import { useMediumZoom } from "@vuepress/plugin-medium-zoom/client";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import PlaygroundFrame from "./components/PlaygroundFrame.vue";

export default defineClientConfig({
  enhance({ app }) {
    app.component("PlaygroundFrame", PlaygroundFrame);
  },
  setup() {
    const router = useRouter();
    const zoom = useMediumZoom();

    const detachSiteBrandLogo = () => {
      if (typeof window === "undefined") return;

      window.setTimeout(() => {
        zoom?.detach(".site-brand .logo");
      }, 600);
    };

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
        detachSiteBrandLogo();
      }
    });

    if (typeof window !== "undefined") {
      router.afterEach(detachSiteBrandLogo);
    }
  },
});
