<script setup>
import { ref } from "vue";

const inputs = ref([
  { type: "text", placeholder: "Enter Your Name" },
  { type: "SourName", placeholder: "Enter Your SourName" },
  { type: "number", placeholder: "+998 ** *** ** **" },
]);

let curses = ref([
  { name: "𝐈𝐍𝐆𝐋𝐈𝐙 𝐓𝐈𝐋𝐈-𝐈𝐄𝐋𝐓𝐒" },
  { name: "𝐑𝐮𝐬 𝐓𝐢𝐥𝐢" },
  { name: "𝐀𝐫𝐚𝐛 𝐓𝐢𝐥𝐢" },
  { name: "𝐌𝐚𝐭𝐞𝐦𝐚𝐭𝐢𝐤𝐚" },
]);
</script>

<template>
  <div class="flex justify-center items-center gap-20 py-34" id="register">
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3687/3687192.png"
        alt="Register"
        class="w-90"
      />
    </div>

    <div class="flex flex-col gap-4 w-1/4">
      <input
        v-for="(item, i) in inputs"
        :key="i"
        :type="item.type"
        :placeholder="item.placeholder"
        class="border border-gray-700 rounded px-3 py-2 outline-none focus:border-blue-700 transition"
      />

      <div class="grid grid-cols-2 gap-4">
        <span v-for="item in curses" :key="item.id" class="flex items-center text-sm gap-2">
          <input type="checkbox" name="" id="" />
          <p>{{ item.name }}</p>
        </span>
      </div>

      <button
        type="submit"
        class="text-xs sm:text-sm bg-blue-400 hover:bg-blue-700 transition-colors px-5 py-1.5 sm:px-6 sm:py-2 rounded-2xl cursor-pointer animate-pulse w-full text-white"
      >
        Sign Up
      </button>
    </div>
  </div>
</template>
