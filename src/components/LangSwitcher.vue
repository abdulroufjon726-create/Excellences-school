<script setup lang="ts">
import { Languages } from "lucide-vue-next";
import { locales, useI18n } from "@/i18n";

const { locale, setLocale, t } = useI18n();

function pick(code: (typeof locales)[number]["code"]) {
  setLocale(code);
}
</script>

<template>
  <div
    class="flex items-center gap-0.5 rounded-full border border-white/20 bg-white/10 p-0.5 backdrop-blur-md"
    role="group"
    :aria-label="t.lang.label"
  >
    <Languages class="ml-2 h-3.5 w-3.5 text-white/70" />
    <button
      v-for="item in locales"
      :key="item.code"
      type="button"
      class="cursor-pointer rounded-full px-2 py-1 text-[11px] font-extrabold tracking-wide transition"
      :class="
        locale === item.code
          ? 'bg-brand-500 text-white shadow'
          : 'text-white/70 hover:text-white'
      "
      :aria-pressed="locale === item.code"
      @click="pick(item.code)"
    >
      {{ item.label }}
    </button>
  </div>
</template>
