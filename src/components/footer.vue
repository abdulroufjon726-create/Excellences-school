<script setup>
import logo from "@/assets/images/logo.jpg";
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="bg-blue-400 p-12 flex gap-6 items-center">
    <div>
      <img
        :src="logo"
        class="w-96 rounded-full shadow-2xl shadow-black animate-spin"
        style="animation-duration: 10s"
      />
    </div>
    <div
      class="flex flex-col justify-center items-center text-center gap-4 text-slate-200 font-mono font-semibold"
    >
      <p>This website was developed specifically for Excellence School.</p>
      <p class="w-2/4">
        Our Excellence School is always here to help you enhance your knowledge
        and skills. With this goal in mind, this website was specially created
        to provide you with all the essential information about our center in a
        quick and convenient way.
      </p>
      <button
        @click="scrollTo('Home')"
        type="submit"
        class="text-xs bg-slate-200 transition-colors py-1.5 rounded-2xl cursor-pointer animate-pulse text-blue-700 w-1/4"
      >
        Home
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>