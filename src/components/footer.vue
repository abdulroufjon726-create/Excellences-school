<script setup lang="ts">
import { ArrowUp, MapPin, Phone } from "lucide-vue-next";
import { useI18n } from "@/i18n";
import logo from "@/assets/images/logo.jpg";

const { t } = useI18n();
const year = new Date().getFullYear();

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <footer class="relative overflow-hidden bg-ink-950 text-slate-400 rounded-t-2xl">
    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
    <div class="absolute -bottom-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" />

    <div class="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div class="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-3">
            <img
              :src="logo"
              alt="Excellence School"
              class="h-12 w-12 rounded-full border border-white/15 shadow-lg"
            />
            <span class="font-display text-xl font-bold text-white">
              Excellence<span class="text-brand-400">.</span>
            </span>
          </div>
          <p class="mt-5 max-w-sm text-sm leading-relaxed">
            {{ t.footer.about }}
          </p>
          <button
            type="button"
            class="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-bold text-white transition hover:border-brand-400/50 hover:bg-brand-500/10"
            @click="scrollTo('home')"
          >
            <ArrowUp class="h-4 w-4" />
            {{ t.footer.up }}
          </button>
        </div>

        <!-- Sahifalar -->
        <nav aria-label="Footer navigation">
          <h3 class="font-display text-sm font-bold uppercase tracking-widest text-white">
            {{ t.footer.pages }}
          </h3>
          <ul class="mt-5 space-y-3 text-sm">
            <li>
              <RouterLink to="/" class="transition hover:text-brand-300">{{ t.footer.pageHome }}</RouterLink>
            </li>
            <li>
              <button type="button" class="cursor-pointer transition hover:text-brand-300" @click="scrollTo('how-it-works')">
                {{ t.footer.pageHow }}
              </button>
            </li>
            <li>
              <button type="button" class="cursor-pointer transition hover:text-brand-300" @click="scrollTo('success')">
                {{ t.footer.pageSuccess }}
              </button>
            </li>
            <li>
              <button type="button" class="cursor-pointer transition hover:text-brand-300" @click="scrollTo('support')">
                {{ t.footer.pageSupport }}
              </button>
            </li>
            <li>
              <RouterLink to="/register" class="transition hover:text-brand-300">{{ t.footer.pageRegister }}</RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Kurslar -->
        <div>
          <h3 class="font-display text-sm font-bold uppercase tracking-widest text-white">
            {{ t.footer.coursesTitle }}
          </h3>
          <ul class="mt-5 space-y-3 text-sm">
            <li v-for="course in t.footer.courses" :key="course">{{ course }}</li>
          </ul>

          <div class="mt-7 space-y-2.5 text-sm">
            <p class="flex items-center gap-2">
              <Phone class="h-4 w-4 shrink-0 text-brand-400" />
              <a href="tel:+998901234567" class="transition hover:text-brand-300">+998 90 123 45 67</a>
            </p>
            <p class="flex items-center gap-2">
              <MapPin class="h-4 w-4 shrink-0 text-brand-400" />
              Toshkent, O'zbekiston
            </p>
          </div>
        </div>
      </div>

      <div class="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-7 text-xs sm:flex-row">
        <p>© {{ year }} Excellence School. {{ t.footer.rights }}</p>
        <p class="text-slate-500">{{ t.footer.slogan }}</p>
      </div>
    </div>
  </footer>
</template>
