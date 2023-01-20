<template>
  <div class="main-container">
    <Navbar />
    <main class="movies-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<style lang="scss" scoped>
.movies-container {
  padding-top: 80px;
}
</style>
