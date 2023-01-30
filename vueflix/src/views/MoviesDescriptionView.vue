<template>
  <div class="movies-description-container">
    <template v-if="!!findMovie">
      <div class="movies-view-container">
        <img class="movies-view-poster" :src="findMovie.Poster" :alt="findMovie.Poster" />
      </div>
      <div class="description-container">
        <h5>LUCASFILM ORIGINAL</h5>
        <h3>{{ findMovie.Title }}</h3>
        <span class="description-row">
          <p class="new-movie">95% Match</p>
          <p>{{ findMovie.Year }}</p>
          <p>{{ findMovie.Type.toUpperCase() }}</p>
          <p>{{ findMovie.Runtime }}</p>
          <p class="box-container">{{ findMovie.Rated }}</p>
          <p class="box-container">{{ findMovie.imdbRating }}</p>
        </span>
        <p>{{ findMovie.Plot }}</p>
        <br />
        <p v-for="(rating, index) in findMovie.Ratings" :key="index">
          <span>{{rating.Source}}: {{rating.Value}}</span>
        </p>
        <div class="watch-now">Watch Now</div>
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
  // Edgecase: Only hit it for the first time, Api returns a single object
  if (Object.keys(movieLocal.value).length > 0) {
    // if there is any movie in ref return our value
    return movieLocal.value;
  }

// Finding our matching movie value and returning that to render in DOM
  return store.state.movies.find((value) => {
    // refrencing the id through the index.js (:id)
    return value.imdbID === route.params.id;
  });

  return store.state.selectedMovie.find((value) => {
    // refrencing the id through the index.js (:id)
    return value.imdbID === route.params.id;
  });
});

const getMovieData = async () => {
  try {
     if (store.state.selectedMovie.length > 0) {
      return (movieLocal.value = store.state.selectedMovie);
    } 

    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=b43d3b73&i=${route.params.id}`
    );

    if (response.status === 200) {
      store.commit("updatedSelectedMovieState", response.data);

      movieLocal.value = response.data;
    }
  } catch (error) {
    console.error("error", error);
  }
};

onMounted(() => { 
  getMovieData();
});
</script>

<style lang="scss" scoped>
.movies-description-container {
  display: flex;
  justify-content: flex-start;
  color: white;
  font-size: 20px;
  padding-left: 25px;

  .description-row {
    display: flex;
    align-items: center;
    gap: 20px;

    .new-movie {
      color: #00bd7e;
      background-color: #003c28;
      border-radius: 20px;
      padding: 0 10px 0 10px;
    }

    .box-container {
      border: 1px solid white;
    }
  }

  .movies-view-container {
    text-align: center;
    .movies-view-poster {
      border-radius: 8px;
      height: 444px;
      width: 300px;
    }
  }

  .description-container {
    padding-left: 10px;

    .watch-now {
      color: #00bd7e;
      background-color: #003c28;
      // border: 1px solid white;
      border-radius: 5px;
      padding: 5px 10px 5px 10px;
      display: inline;
      bottom: 8px;
      position: absolute;
      cursor: pointer;
      opacity: 0.8;
    }

    .watch-now:hover {
      background-color: white;
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }

    h3 {
      font-weight: 600;
    }
  }
}

@media (max-width: 590px) {
  .movies-description-container {
    display: block;
    padding-left: 0;
  }

  .description-row {
    font-size: 15px;
  }
}
</style>
