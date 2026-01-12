<script setup>
import Header from "@/components/header.vue";
import Aboutworks from "@/components/aboutworks.vue";
import Our_success from "@/components/our_success.vue";
import Support from "@/components/support.vue";
import Footer from "./footer.vue";
</script>

<template>
  <Header />
  <Our_success />
  <Aboutworks />
  <Support />
  <router-view />
  <Footer/>
</template>
