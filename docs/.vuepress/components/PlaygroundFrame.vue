<template>
  <section class="playground-frame">
    <header class="playground-frame__toolbar">
      <div class="playground-frame__meta">
        <h3 v-if="title" class="playground-frame__title">{{ title }}</h3>
        <p v-if="description" class="playground-frame__description">{{ description }}</p>
      </div>

      <div class="playground-frame__actions">
        <button
          type="button"
          class="playground-frame__button playground-frame__button--primary"
          @click="reloadFrame"
        >
          <span class="playground-frame__button-icon" aria-hidden="true">↻</span>
          <span>刷新</span>
        </button>
        <a
          class="playground-frame__button playground-frame__button--secondary"
          :href="src"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="playground-frame__button-icon" aria-hidden="true">↗</span>
          <span>{{ openLabel }}</span>
        </a>
        <a
          v-if="sourceHref"
          class="playground-frame__button playground-frame__button--ghost"
          :href="sourceHref"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span class="playground-frame__button-icon" aria-hidden="true">&lt;/&gt;</span>
          <span>源码</span>
        </a>
      </div>
    </header>

    <div class="playground-frame__viewport">
      <iframe
        :key="reloadKey"
        class="playground-frame__iframe"
        :src="src"
        :title="title || 'Playground example'"
        :style="{ height: normalizedHeight }"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  height: {
    type: [Number, String],
    default: 560,
  },
  description: {
    type: String,
    default: "",
  },
  source: {
    type: String,
    default: "",
  },
  openLabel: {
    type: String,
    default: "新开示例",
  },
});

const reloadKey = ref(0);
const GITHUB_SOURCE_BASE = "https://github.com/zhao-yi-fan/note/blob/master/";

const normalizedHeight = computed(() =>
  typeof props.height === "number" ? `${props.height}px` : props.height
);

const sourceHref = computed(() => {
  if (!props.source) {
    return "";
  }

  if (/^https?:\/\//.test(props.source)) {
    return props.source;
  }

  return `${GITHUB_SOURCE_BASE}${props.source.replace(/^\/+/, "")}`;
});

function reloadFrame() {
  reloadKey.value += 1;
}
</script>

<style scoped>
.playground-frame {
  margin: 1.5rem 0;
  border: 1px solid #e5e7eb;
  border-radius: 18px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.08);
}

.playground-frame__toolbar {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1rem 0.9rem;
  border-bottom: 1px solid #e5e7eb;
  background:
    radial-gradient(circle at top left, rgba(251, 146, 60, 0.12), transparent 32%),
    linear-gradient(180deg, #fffaf5 0%, #ffffff 100%);
}

.playground-frame__meta {
  min-width: 0;
}

.playground-frame__title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.4;
}

.playground-frame__description {
  margin: 0.35rem 0 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #6b7280;
}

.playground-frame__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.5rem;
  align-items: flex-start;
}

.playground-frame__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 2.15rem;
  padding: 0.55rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 0.84rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;
}

.playground-frame__button:hover {
  transform: translateY(-1px);
}

.playground-frame__button-icon {
  font-size: 0.9rem;
  opacity: 0.9;
}

.playground-frame__button--primary {
  color: #fff;
  background: linear-gradient(135deg, #f97316, #ea580c);
  box-shadow: 0 10px 24px rgba(249, 115, 22, 0.2);
}

.playground-frame__button--primary:hover {
  box-shadow: 0 14px 28px rgba(249, 115, 22, 0.28);
}

.playground-frame__button--secondary {
  color: #9a3412;
  background: #fff;
  border-color: rgba(249, 115, 22, 0.22);
  box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
}

.playground-frame__button--secondary:hover {
  background: #fff7ed;
  border-color: rgba(249, 115, 22, 0.34);
}

.playground-frame__button--ghost {
  color: #6b7280;
  background: rgba(255, 255, 255, 0.82);
  border-color: rgba(148, 163, 184, 0.25);
  box-shadow: none;
}

.playground-frame__button--ghost:hover {
  color: #334155;
  background: #fff;
  border-color: rgba(148, 163, 184, 0.38);
}

.playground-frame__button:focus-visible {
  outline: 2px solid rgba(249, 115, 22, 0.35);
  outline-offset: 2px;
}

.playground-frame__viewport {
  padding: 0;
  background: #fff;
}

.playground-frame__iframe {
  display: block;
  width: 100%;
  border: 0;
  background: #fff;
}

@media (max-width: 768px) {
  .playground-frame__toolbar {
    flex-direction: column;
  }

  .playground-frame__actions {
    justify-content: flex-start;
  }
}
</style>
