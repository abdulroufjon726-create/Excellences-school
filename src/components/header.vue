<script setup>
import logo from "@/assets/images/logo.jpg";
import bgimg from "@/assets/images/Rectangle 168.svg";
import { RouterLink } from "vue-router";

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="pt-2 font-mono">
    <nav class="flex justify-between items-center px-6">
      <div>
        <img
          :src="logo"
          alt=""
          class="w-14 h-14 rounded-full shadow-2xl shadow-black animate-spin"
          style="animation-duration: 10s"
        />
      </div>
      <div>
        <ul class="flex items-center gap-5">
          <RouterLink to="/">
            <li
              class="md:text-[12px] text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
            >
              Home
            </li>
          </RouterLink>
          <li
            class="text-xs text-blue-400 hover:text-blue-700 transition-colors cursor-pointer"
            @click="scrollTo('How It Works?')"
          >
            How It Works?
          </li>
          <RouterLink to="/Register" @click="scrollTo('register')">
            <p
              class="md:text-[12px] text-slate-50 bg-blue-400 hover:bg-blue-700 transition-colors cursor-pointer px-2 py-1 rounded-2xl">
              Register now
            </p>
          </RouterLink>
        </ul>
      </div>
    </nav>
    <div
      class="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] mt-5"
      id="Home"
    >
      <img :src="bgimg" alt="" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="absolute inset-0 flex items-center justify-center">
        <ul
          class="text-white max-w-xl px-4 sm:px-8 space-y-3 sm:space-y-4 text-center"
        >
          <li class="text-xl sm:text-2xl md:text-3xl font-bold">
            Take student experience to the next level
          </li>

          <li class="text-xs sm:text-sm opacity-90">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </li>

          <li>
            <button
              class="text-xs sm:text-sm bg-blue-400 hover:bg-blue-700 transition-colors px-5 py-1.5 sm:px-6 sm:py-2 rounded-2xl cursor-pointer animate-pulse"
            >
              Join Now
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>