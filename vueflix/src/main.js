import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const store = createStore({
  state() {
    return {
      movies: [],
      selectedMovie: [],
    };
  },
  mutations: {
    updatedMoviesState(state, payload) {
      state.movies = payload;
    },
    updatedSelectedMovieState(state, payload) {
      state.selectedMovie = payload;
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
