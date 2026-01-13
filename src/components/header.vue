<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import logo from "@/assets/images/logo.jpg";
import bgimg from "@/assets/images/Rectangle 168.svg";

const isOpen = ref(false);

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  isOpen.value = false;
};
</script>

<template>
  <div class="pt-2 font-mono">
    <nav class="flex justify-between items-center px-6 py-4 relative">
      <div>
        <img
          :src="logo"
          alt="Logo"
          class="w-12 h-12 rounded-full shadow-lg animate-spin"
          style="animation-duration: 10s"
        />
      </div>

      <ul class="hidden md:flex items-center gap-6">
        <RouterLink to="/">
          <li
            class="text-sm text-blue-400 hover:text-blue-700 transition cursor-pointer"
          >
            Home
          </li>
        </RouterLink>

        <li
          class="text-sm text-blue-400 hover:text-blue-700 transition cursor-pointer"
          @click="scrollTo('How It Works?')"
        >
          How It Works?
        </li>

        <RouterLink to="/Register" @click="scrollTo('register')">
          <li
            class="text-sm text-white bg-blue-400 hover:bg-blue-700 transition px-3 py-1 rounded-2xl"
          >
            Register now
          </li>
        </RouterLink>
      </ul>

      <button class="md:hidden text-blue-500" @click="isOpen = !isOpen">
        ☰
      </button>

      <div
        v-if="isOpen"
        class="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-20"
      >
        <ul class="flex flex-col items-center gap-4 py-4">
          <RouterLink to="/" @click="isOpen = false">
            <li class="text-blue-400 hover:text-blue-700">Home</li>
          </RouterLink>

          <li
            class="text-blue-400 hover:text-blue-700 cursor-pointer"
            @click="scrollTo('How It Works?')"
          >
            How It Works?
          </li>

          <RouterLink to="/Register" @click="scrollTo('register')">
            <li
              class="text-white bg-blue-400 hover:bg-blue-700 px-4 py-1 rounded-2xl"
            >
              Register now
            </li>
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
              @click="scrollTo('support')"
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