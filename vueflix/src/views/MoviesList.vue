<template>
  <div class="movies-list-container">
    <Movies
      @click="handleClick(movie.imdbID)"
      v-for="(movie, index) in moviesState"
      :key="index"
      :poster="movie.Poster"
      :title="movie.Title"
      :type="movie.Type"
      :year="movie.Year"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, RouterView, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import Movies from "../components/Movies.vue";

const store = useStore();
const moviesState = ref([]);
const router = useRouter();

// NOTE: Function to get all movie data when component is initially rendered
const getAllMovies = async () => {
  try {
    // NOTE: Edgecase if there is any movies stored in state, set local state
    if (store.state.movies.length > 0) {
      return (moviesState.value = store.state.movies);
    }

    const response = await axios.get(
      "http://www.omdbapi.com/?apikey=b43d3b73&s=star+wars"
    );

    if (response.status === 200) {
      store.commit("updatedMoviesState", response.data.Search);

      moviesState.value = response.data.Search;
    }
  } catch (error) {
    console.error("error", error);
  }
};

// NOTE: Routes the user to the movie description component based on the selected id
const handleClick = (id) => {
  router.push({ name: "movies-description", params: { id } });
};

onMounted(() => {
  getAllMovies();
});
</script>

<style lang="scss" scoped>
.movies-list-container {
  place-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: minmax(min-content, max-content);
}

@media (max-width: 1024px) {
  .movies-list-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 820px) {
  .movies-list-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 590px) {
  .movies-list-container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
