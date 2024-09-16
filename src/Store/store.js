import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favorites";
import moviesReducer from "./slices/movies";
import languageReducer from "./slices/language";

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movies: moviesReducer,
    language: languageReducer,
  },
});

export default store;
