<template>
  <div class="title-container">
    <h3 class="green">{{ title }}</h3>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.title-container > h3 {
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
