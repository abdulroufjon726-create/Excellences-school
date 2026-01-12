<script setup>
import support_img from "@/assets/images/support.png";
import { ref } from "vue";

const inputs = ref([
  { name: "Your Name", type: "text", placeholder: "Enter Your Name" },
  { name: "Email Address", type: "email", placeholder: "Enter Your Email" },
  { name: "Mobile Number", type: "number", placeholder: "+998 ** *** ** **" },
]);

</script>

<template>
  <div>
    <div class="py-15 flex items-center justify-center">
      <div>
        <img :src="support_img" alt="" class="w-3/4" />
      </div>
      <div class="space-y-4">
        <ul>
          <li class="text-3xl font-semibold mb-4 animate-pulse text-blue-700">Need Support</li>
          <li>Contact professionals for guidance</li>
        </ul>
        <div class="" v-for="(input, index) in inputs" :key="index">
          <label
            class="block mb-1 text-sm font-medium text-heading"
            >{{ input.name }}</label
          >
          <input
            :type="input.type"
            class="border-gray-700 border rounded w-full hover:border-blue-700 transition-colors outline-none px-2"
            :placeholder="input.placeholder"
          />
        </div>
        <textarea class="border-gray-700 border rounded w-full hover:border-blue-700 transition-colors outline-none px-2" placeholder="Type Here... "></textarea>
        <button
          class="text-xs sm:text-sm bg-blue-400 hover:bg-blue-700 transition-colors px-5 py-1.5 sm:px-6 sm:py-2 rounded-2xl cursor-pointer animate-pulse w-full text-white"
        >
          Join Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>