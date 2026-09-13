<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import {
  ArrowRight,
  GraduationCap,
  Menu,
  Phone,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
} from "lucide-vue-next";
import LangSwitcher from "@/components/LangSwitcher.vue";
import { useI18n } from "@/i18n";
import logo from "@/assets/images/logo.jpg";
import bgimg from "@/assets/images/hero-bg.jpg";

const isOpen = ref(false);
const scrolled = ref(false);
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

/** Hero statistika ikonkalari — t.hero.stats tartibi bilan mos. */
const heroIcons = [Users, Trophy, GraduationCap];

const onScroll = () => {
  scrolled.value = window.scrollY > 12;
};

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});
onUnmounted(() => window.removeEventListener("scroll", onScroll));

/** Bo'limlarga silliq scroll; boshqa sahifada bo'lsa avval bosh sahifaga qaytadi. */
const scrollTo = (id: string) => {
  isOpen.value = false;
  if (route.path !== "/") {
    router.push("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <header class="relative">
    <!-- ─── NAVBAR ─── -->
    <nav
      class="fixed inset-x-0 top-0 z-50 transition-all duration-300 rounded-b-2xl"
      :class="scrolled ? 'bg-ink-950/85 shadow-lg shadow-ink-950/20 backdrop-blur-xl' : 'bg-transparent'"
    >
      <div class="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        <RouterLink to="/" class="group flex items-center gap-3">
          <img
            :src="logo"
            alt="Excellence School"
            class="h-11 w-11 rounded-full border border-white/25 shadow-lg shadow-brand-950/40 transition-transform duration-500 group-hover:rotate-12"
          />
          <span class="font-display text-lg font-bold tracking-tight text-white">
            Excellence<span class="text-brand-400">.</span>
          </span>
        </RouterLink>

        <ul class="hidden items-center gap-1 md:flex">
          <li>
            <RouterLink
              to="/"
              class="rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {{ t.nav.home }}
            </RouterLink>
          </li>
          <li>
            <button
              type="button"
              class="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              @click="scrollTo('how-it-works')"
            >
              {{ t.nav.how }}
            </button>
          </li>
          <li>
            <button
              type="button"
              class="cursor-pointer rounded-full px-4 py-2 text-sm font-semibold text-white/85 transition hover:bg-white/10 hover:text-white"
              @click="scrollTo('success')"
            >
              {{ t.nav.success }}
            </button>
          </li>
          <li>
            <RouterLink
              to="/register"
              class="ml-1 flex items-center gap-1.5 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-500/40 transition hover:-translate-y-0.5 hover:bg-brand-400 hover:shadow-brand-400/50"
            >
              {{ t.nav.register }}
              <ArrowRight class="h-4 w-4" />
            </RouterLink>
          </li>
          <li class="ml-2">
            <LangSwitcher />
          </li>
        </ul>

        <button
          type="button"
          class="rounded-xl p-2 text-white transition hover:bg-white/10 md:hidden"
          :aria-expanded="isOpen"
          aria-label="Menu"
          @click="isOpen = !isOpen"
        >
          <Menu v-if="!isOpen" class="h-6 w-6" />
          <X v-else class="h-6 w-6" />
        </button>
      </div>

      <!-- Mobil menyu -->
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <div
          v-if="isOpen"
          class="border-t border-white/10 bg-ink-950/95 px-6 pb-6 pt-2 backdrop-blur-xl md:hidden"
        >
          <ul class="flex flex-col gap-1 py-2">
            <li>
              <RouterLink
                to="/"
                class="block rounded-xl px-4 py-3 font-semibold text-white/90 transition hover:bg-white/10"
                @click="isOpen = false"
              >
                {{ t.nav.home }}
              </RouterLink>
            </li>
            <li>
              <button
                type="button"
                class="block w-full cursor-pointer rounded-xl px-4 py-3 text-left font-semibold text-white/90 transition hover:bg-white/10"
                @click="scrollTo('how-it-works')"
              >
                {{ t.nav.how }}
              </button>
            </li>
            <li>
              <button
                type="button"
                class="block w-full cursor-pointer rounded-xl px-4 py-3 text-left font-semibold text-white/90 transition hover:bg-white/10"
                @click="scrollTo('success')"
              >
                {{ t.nav.success }}
              </button>
            </li>
            <li>
              <RouterLink
                to="/register"
                class="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 font-bold text-white shadow-lg shadow-brand-500/30"
                @click="isOpen = false"
              >
                {{ t.nav.register }}
                <ArrowRight class="h-4 w-4" />
              </RouterLink>
            </li>
            <li class="mt-3 flex justify-center">
              <LangSwitcher />
            </li>
          </ul>
        </div>
      </transition>
    </nav>

    <!-- ─── HERO ─── -->
    <section id="home" class="relative flex min-h-[92vh] items-center overflow-hidden">
      <img
        :src="bgimg"
        alt=""
        class="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        fetchpriority="high"
        decoding="async"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/80 to-brand-950/50" />
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(51,132,251,0.28),transparent_55%)]" />

      <div class="relative mx-auto w-full max-w-7xl px-5 py-32 sm:px-8">
        <div class="max-w-2xl">
          <div v-reveal class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-md">
            <Sparkles class="h-4 w-4 text-gold-400" />
            <span class="text-xs font-bold uppercase tracking-widest text-brand-100">
              {{ t.hero.badge }}
            </span>
          </div>

          <h1
            v-reveal="100"
            class="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {{ t.hero.titlePre }}
            <span class="text-gradient-light">{{ t.hero.titleAccent }}</span>
            {{ t.hero.titlePost }}
          </h1>

          <p
            v-reveal="200"
            class="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg"
          >
            {{ t.hero.subtitle }}
          </p>

          <div v-reveal="300" class="mt-9 flex flex-wrap items-center gap-4">
            <RouterLink
              to="/register"
              class="pulse-ring group flex items-center gap-2 rounded-2xl bg-brand-500 px-7 py-3.5 font-bold text-white shadow-xl shadow-brand-500/40 transition hover:-translate-y-0.5 hover:bg-brand-400"
            >
              {{ t.hero.cta }}
              <ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </RouterLink>
            <button
              type="button"
              class="glass cursor-pointer rounded-2xl px-7 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:bg-white/15"
              @click="scrollTo('how-it-works')"
            >
              {{ t.hero.secondary }}
            </button>
          </div>

          <dl v-reveal="400" class="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <div v-for="(stat, si) in t.hero.stats" :key="stat.label" class="flex items-center gap-3">
              <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/25 text-brand-200">
                <component :is="heroIcons[si] ?? Users" class="h-5 w-5" />
              </span>
              <div>
                <dt class="font-display text-lg font-bold text-white">{{ stat.value }}</dt>
                <dd class="text-xs text-slate-400">{{ stat.label }}</dd>
              </div>
            </div>
          </dl>
        </div>
      </div>

      <!-- Bitiruvchi fikri: suzib yuruvchi plashka -->
      <div class="absolute bottom-10 right-10 hidden animate-float-slow xl:block">
        <div class="glass w-72 rounded-3xl p-5 shadow-2xl shadow-ink-950/50">
          <div class="flex items-center gap-1 text-gold-400">
            <Star v-for="n in 5" :key="n" class="h-4 w-4 fill-current" />
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-200">
            {{ t.hero.quote }}
          </p>
          <p class="mt-3 flex items-center gap-2 text-xs font-bold text-white">
            <Phone class="h-3.5 w-3.5 text-brand-300" />
            {{ t.hero.author }}
          </p>
        </div>
      </div>
    </section>
  </header>
</template>
