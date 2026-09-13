<script setup lang="ts">
import { onMounted } from "vue";
import Header from "@/components/header.vue";
import Aboutworks from "@/components/aboutworks.vue";
import Our_success from "@/components/our_success.vue";
import Support from "@/components/support.vue";
import Footer from "./footer.vue";

// Sahifa /#support kabi hash bilan ochilsa, SPA render bo'lgach shu bo'limga scroll qilamiz
onMounted(() => {
  const { hash } = window.location;
  if (hash) {
    setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  }
});
</script>

<template>
  <Header />
  <Our_success />
  <Aboutworks />
  <Support />
  <Footer />
</template>
