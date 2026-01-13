<script setup>
import { ref } from "vue";

const inputs = ref([
  { type: "text", placeholder: "Enter Your Name" },
  { type: "text", placeholder: "Enter Your Surname" },
  { type: "tel", placeholder: "+998 __ ___ __ __" },
]);

const courses = ref([
  { id: 1, name: "𝐈𝐍𝐆𝐋𝐈𝐙 𝐓𝐈𝐋𝐈 - 𝐈𝐄𝐋𝐓𝐒" },
  { id: 2, name: "𝐑𝐮𝐬 𝐓𝐢𝐥𝐢" },
  { id: 3, name: "𝐀𝐫𝐚𝐛 𝐓𝐢𝐥𝐢" },
  { id: 4, name: "𝐌𝐚𝐭𝐞𝐦𝐚𝐭𝐢𝐤𝐚" },
]);
</script>

<template>
  <div
    id="register"
    class="flex flex-col md:flex-row justify-center items-center gap-10 py-24"
  >
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3687/3687192.png"
        alt="Register"
        class="hidden md:block w-[360px]"
      />
    </div>

    <div class="flex flex-col gap-4 w-full md:w-1/4 px-4">
      <div class="">
        <p class="text-3xl font-semibold mb-4 animate-pulse text-blue-700">
          Sign Up
        </p>
      </div>
      <input
        v-for="(item, i) in inputs"
        :key="i"
        :type="item.type"
        :placeholder="item.placeholder"
        class="border border-gray-600 rounded px-3 py-2 outline-none focus:border-blue-600 transition"
      />

      <div class="grid grid-cols-2 gap-3">
        <label
          v-for="item in courses"
          :key="item.id"
          :for="item.id"
          class="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input type="checkbox" :id="item.id" />
          <span>{{ item.name }}</span>
        </label>
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 transition-colors px-6 py-2 rounded-2xl w-full text-white text-sm"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
