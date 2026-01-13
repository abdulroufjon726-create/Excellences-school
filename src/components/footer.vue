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
  <section
    class="bg-blue-400 px-6 py-16 flex flex-col md:flex-row gap-10 items-center"
  >
    <div class="flex justify-center">
      <img
        :src="logo"
        alt="Excellence School Logo"
        class="w-48 md:w-72 rounded-full shadow-2xl shadow-black animate-spin"
        style="animation-duration: 10s"
      />
    </div>

    <div
      class="flex flex-col items-center md:items-start text-center md:text-left gap-4 text-slate-200 font-mono font-semibold"
    >
      <p class="text-lg">
        This website was developed specifically for Excellence School.
      </p>

      <p class="max-w-xl">
        Our Excellence School is always here to help you enhance your knowledge
        and skills. With this goal in mind, this website was specially created
        to provide you with all the essential information about our center in a
        quick and convenient way.
      </p>

      <button
        @click="scrollTo('Home')"
        type="button"
        class="bg-slate-200 hover:bg-white transition-colors px-6 py-2 rounded-2xl cursor-pointer text-blue-700 w-fit"
      >
        Home
      </button>
    </div>
  </section>
</template>
