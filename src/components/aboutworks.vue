<script setup lang="ts">
import { RouterLink } from "vue-router";
import {
  CalendarClock,
  FileCheck,
  MonitorSmartphone,
  UserRoundCheck,
} from "lucide-vue-next";
import { useI18n } from "@/i18n";

const { t } = useI18n();
const icons = [UserRoundCheck, CalendarClock, MonitorSmartphone, FileCheck];
</script>

<template>
  <section
    id="how-it-works"
    class="relative overflow-hidden bg-gradient-to-br from-ink-950 via-brand-950 to-ink-950 py-20 text-slate-100 sm:py-24"
  >
    <div class="absolute -left-32 top-1/3 h-96 w-96 animate-blob rounded-full bg-brand-600/20 blur-3xl" />
    <div class="absolute -right-32 bottom-0 h-96 w-96 animate-blob rounded-full bg-brand-400/10 blur-3xl [animation-delay:5s]" />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="text-sm font-bold uppercase tracking-widest text-brand-300">
          {{ t.how.eyebrow }}
        </p>
        <h2
          v-reveal="100"
          class="font-display mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
        >
          {{ t.how.titlePre }}
          <span class="text-gradient-light">{{ t.how.titleAccent }}</span>
        </h2>
        <p v-reveal="200" class="mt-4 text-slate-400">
          {{ t.how.subtitle }}
        </p>
      </div>

      <ol class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(item, i) in t.how.steps"
          :key="item.name"
          v-reveal="i * 120"
          class="group relative rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-[border-color,background-color] duration-300 hover:border-brand-400/40 hover:bg-white/[0.07]"
        >
          <span class="font-display absolute right-6 top-5 text-4xl font-extrabold text-white/10 transition-colors group-hover:text-brand-400/30">
            {{ String(i + 1).padStart(2, "0") }}
          </span>
          <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 p-3 text-white shadow-lg shadow-brand-500/30">
            <component :is="icons[i]" class="h-6 w-6" />
          </span>
          <h3 class="font-display mt-5 text-xl font-bold text-white">
            {{ item.name }}
          </h3>
          <p class="mt-2.5 text-sm leading-relaxed text-slate-400">
            {{ item.text }}
          </p>
        </li>
      </ol>

      <div v-reveal class="mt-12 text-center">
        <RouterLink
          to="/register"
          class="inline-flex items-center gap-2 rounded-2xl bg-brand-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-400"
        >
          {{ t.how.cta }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>
