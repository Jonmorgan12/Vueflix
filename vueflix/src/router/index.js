import { createRouter, createWebHistory } from "vue-router";
import MoviesDescriptionView from "../views/MoviesDescriptionView.vue";
import MoviesList from "../views/MoviesList.vue";

// transfer movielist to views folder
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/movies-list",
    },
    {
      path: "/movies-list",
      name: "movies-list",
      component: MoviesList,
    },
    {
      path: "/movies-description/:id",
      name: "movies-description",
      component: MoviesDescriptionView,
    },
  ],
});

export default router;
