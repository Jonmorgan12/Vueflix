<template>
  <header class="header-nav">
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="50"
      height="50"
    />
    <NavbarTitle title="Vueflix 🎬" />
    <div class="wrapper">
      <nav class="router-container">
        <RouterLink to="/movies-list">Home</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import NavbarTitle from "./NavbarTitle.vue";
</script>

<style lang="scss" scoped>
.header-nav {
  line-height: 1.5;
  max-height: 200px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: left;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 99;
  width: 100%;

  .logo {
    display: block;
  }

  .router-container {
    width: 100%;
    font-size: 16px;

    a.router-link-exact-active:hover {
      background-color: transparent;
    }

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);
    }

    a:first-of-type {
      border: 0;
    }
  }
}

@media (min-width: 1024px) {
  .header-nav {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);

    .logo {
      margin: 0 0 0 2rem;
    }

    .header-nav .wrapper {
      display: flex;
      place-items: flex-start;
      flex-wrap: wrap;
    }

    .router-container {
      text-align: left;
      font-size: 1rem;

      padding: 1rem 0;
    }
  }
}
</style>
