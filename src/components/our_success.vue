<script setup>
import { reactive } from "vue";

let abouts = reactive([
  { name: "Number of students", info: "1.5K" },
  { name: "Percentage of success", info: "70%" },
  { name: "Number of experts", info: "10+" },
  { name: "Years of experience", info: "6+" },
]);
</script>

<template>
  <div class="py-12 font-mono text-blue-700">
    <h2 class="text-3xl font-semibold text-center mb-10 animate-pulse">
      Our Success
    </h2>
    <div class="grid md:grid-cols-4 gap-10 text-center justify-center">
      <div v-for="about in abouts" :key="about.id">
        <p
          class="text-3xl font-bold animate-bounce"
          style="animation-duration: 1s"
        >
          {{ about.info }}
        </p>
        <p class="text-sm">{{ about.name }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>