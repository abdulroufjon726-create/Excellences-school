<script setup>
import support_img from "@/assets/images/support.png";
import { ref } from "vue";

const inputs = ref([
  { name: "Your Name", type: "text", placeholder: "Enter Your Name" },
  { name: "Email Address", type: "email", placeholder: "Enter Your Email" },
  { name: "Mobile Number", type: "tel", placeholder: "+998 __ ___ __ __" },
]);

</script>

<template>
  <div class="py-16">
    <div
      class="flex flex-col md:flex-row items-center justify-center gap-12 px-4"
    >
      <div class="w-full md:w-1/2 flex justify-center">
        <img
          :src="support_img"
          alt="Support"
          class="w-64 md:w-80"
        />
      </div>

      <div class="space-y-4 w-full md:w-1/3" id="support">
        <div>
          <h2 class="text-3xl font-semibold text-blue-700 mb-2">
            Need Support
          </h2>
          <p class="text-gray-600">
            Contact professionals for guidance
          </p>
        </div>

        <div v-for="(input, index) in inputs" :key="index">
          <label class="block mb-1 text-sm font-medium">
            {{ input.name }}
          </label>
          <input
            :type="input.type"
            :placeholder="input.placeholder"
            class="border border-gray-600 rounded w-full px-3 py-2 outline-none focus:border-blue-600 transition"
          />
        </div>

        <textarea
          rows="4"
          placeholder="Type here..."
          class="border border-gray-600 rounded w-full px-3 py-2 outline-none focus:border-blue-600 transition"
        ></textarea>

        <button
          class="bg-blue-500 hover:bg-blue-700 transition-colors px-6 py-2 rounded-2xl w-full text-white text-sm"
        >
          Join Now
        </button>
      </div>
    </div>
  </div>
</template>
