<script setup>
import {
  UserRoundCheck,
  Monitor,
  CircleQuestionMark,
  FileCheck,
} from "lucide-vue-next";
import { reactive } from "vue";

let how_it_works = reactive([
  {
    icon: UserRoundCheck,
    name: "Sign Up",
    title: `Montes vivamus curae quisque et primis pretium nullam. Congue dis convallis eget ipsum cubilia ante.`,
  },
  {
    icon: Monitor,
    name: "Get access",
    title: `Access to question bank of over 2000 questions`,
  },
  {
    icon: CircleQuestionMark,
    name: "Practice questions",
    title: `Prepare for the MLA exam in multiple modes of revision and track your progress with your personalised dashboard`,
  },
  {
    icon: FileCheck,
    name: "Get Result",
    title: `compare your results with your peers' with advanced analytics`,
  },
]);
</script>

<template>
  <div
    class="bg-blue-400 py-12 px-16 font-mono text-slate-100"
    id="How It Works?"
  >
    <div class="flex justify-center text-2xl font-semibold animate-pulse">
      <p>How It Works</p>
    </div>
    <div class="grid md:grid-cols-4 gap-6 justify-center pt-12">
      <ul v-for="item in how_it_works" :key="item.id" class="space-y-2">
        <span
          class="border border-gray-200 w-12 h-12 flex items-center justify-center rounded-full"
        >
          <component :is="item.icon" />
        </span>
        <li class="font-semibold text-2xl">{{ item.name }}</li>
        <li>{{ item.title }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>