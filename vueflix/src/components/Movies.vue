<template>
  <div class="movie-wrapper">
    <img class="movie-poster" :src="poster" :alt="title" />
    <h3>{{ title }}</h3>
    <h4>{{ year }}</h4>
  </div>
</template>

<script setup>
defineProps({
  poster: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: false,
  },
  year: {
    type: String,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.movie-wrapper {
  padding: 10px;
  opacity: 0.78;
  cursor: pointer;

  .movie-poster {
    border-radius: 8px;
  }

  h3,
  h4 {
    color: white;
    font-weight: 600;
  }
}

.movie-wrapper:hover {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
</style>
