import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoriteArr: JSON.parse(localStorage.getItem("favoriteArr")) || [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorite(state, action) {
      state.favoriteArr.push(action.payload);

      localStorage.setItem("favoriteArr", JSON.stringify(state.favoriteArr));
    },
    removeFromFavorite(state, action) {
      state.favoriteArr = [
        ...state.favoriteArr.filter((item) => item !== action.payload),
      ];
      console.log(state.favoriteArr);

      localStorage.setItem("favoriteArr", JSON.stringify(state.favoriteArr));
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
