<template>
  <div class="movies-description-container">
    <template v-if="!!findMovie">
      <div>
        <img
          class="movies-view-poster"
          :src="findMovie.Poster"
          :alt="findMovie.Poster"
        />
      </div>
      <div class="description-container">
        <h3>{{ findMovie.Title }}</h3>
        <h4>Released: {{ findMovie.Year }}</h4>
        <h4>
          Description: Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Doloribus voluptates ducimus perferendis cum eligendi dolores ex, eum
          minus ad omnis nobis dignissimos ea modi dicta repellendus at
          excepturi, hic rerum. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Recusandae est iusto ullam, sunt eius libero ab
          accusantium suscipit itaque animi, reprehenderit totam non ad possimus
          fugiat aliquid, in deleniti? Placeat.
        </h4>
        <h4>Rating: ⭐️ ⭐️ ⭐️ ⭐️ ⭐️</h4>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";

const route = useRoute();
const store = useStore();
const movieLocal = ref([]);

const findMovie = computed(() => {
  if (Object.keys(movieLocal.value).length > 0) {
    return movieLocal.value;
  }

  return store.state.movies.find((value) => {
    return value.imdbID === route.params.id;
  });
});

const getMovieData = async () => {
  try {
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=b43d3b73&i=${route.params.id}`
    );

    if (response.status === 200) {
      movieLocal.value = response.data;
    }
  } catch (error) {
    console.error("error", error);
  }
};

onMounted(() => {
  //NOTE: Edge case if there is already movies stored in state do not call again
  if (store.state.movies.length <= 0) {
    return getMovieData();
  }
});
</script>

<style lang="scss" scoped>
.movies-description-container {
  display: flex;
  justify-content: flex-start;
  color: white;
  font-size: 20px;
  padding-left: 25px;

  .movies-view-poster {
    border-radius: 8px;
    height: 444px;
    width: 300px;
  }

  .description-container {
    padding-left: 10px;

    h3 {
      font-weight: 600;
    }
  }
}

@media (max-width: 590px) {
  .movies-description-container {
    display: block;
  }
}
</style>
