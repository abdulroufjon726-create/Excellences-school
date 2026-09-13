<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { Award, GraduationCap, Trophy, UsersRound } from "lucide-vue-next";
import { useI18n } from "@/i18n";

const { t } = useI18n();

const icons = [UsersRound, Trophy, GraduationCap, Award];

const root = ref<HTMLElement | null>(null);
const values = ref<number[]>(t.value.success.items.map(() => 0));
let observer: IntersectionObserver | null = null;
let started = false;

/** Raqamli sanash effekti — bo'lim ko'ringanda bir marta ishga tushadi. */
function runCounters() {
  if (started) return;
  started = true;
  const targets = t.value.success.items.map((s) => s.target);
  const duration = 1600;
  const t0 = performance.now();

  const tick = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    values.value = targets.map((target) => Math.round(target * eased));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

onMounted(() => {
  if (typeof IntersectionObserver === "undefined") {
    runCounters();
    return;
  }
  observer = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        runCounters();
        observer?.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  if (root.value) observer.observe(root.value);
});
onUnmounted(() => observer?.disconnect());

const format = (n: number) => n.toLocaleString("ru-RU").replace(/,/g, " ");
</script>

<template>
  <section
    id="success"
    ref="root"
    class="relative overflow-hidden bg-white py-20 sm:py-24"
  >
    <div class="absolute -top-24 right-0 h-72 w-72 animate-blob rounded-full bg-brand-100 blur-3xl" />

    <div class="relative mx-auto max-w-7xl px-5 sm:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p v-reveal class="text-sm font-bold uppercase tracking-widest text-brand-600">
          {{ t.success.eyebrow }}
        </p>
        <h2
          v-reveal="100"
          class="font-display mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl"
        >
          {{ t.success.title }}
        </h2>
        <p v-reveal="200" class="mt-4 text-slate-600">
          {{ t.success.subtitle }}
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(stat, i) in t.success.items"
          :key="stat.name"
          v-reveal="i * 120"
          class="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-7 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10"
        >
          <!-- Hover bubble: sekin (700ms) ochiladi, faqat transform — lag qilmaydi -->
          <div
            class="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-brand-50 transition-transform duration-700 ease-out group-hover:scale-[2.6]"
          />
          <span class="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-lg shadow-brand-500/30">
            <component :is="icons[i]" class="h-6 w-6" />
          </span>
          <p class="font-display relative mt-5 text-4xl font-extrabold tracking-tight text-ink-900">
            {{ format(values[i] ?? 0) }}{{ stat.suffix }}
          </p>
          <p class="relative mt-1 font-bold text-brand-700">{{ stat.name }}</p>
          <p class="relative mt-0.5 text-sm text-slate-500">{{ stat.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
