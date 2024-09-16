import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({ page = 1, searchValue = "", language = "en-US" }, thunkAPI) => {
    try {
      const endpoint = searchValue ? "search/movie" : "movie/popular";
      const params = searchValue
        ? { query: searchValue, language }
        : { page, language };

      const response = await axios.get(
        `https://api.themoviedb.org/3/${endpoint}`,
        {
          params: {
            ...params,
            api_key: "57fb71a7e41a37c25c954a15f90d6e84",
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    totalPages: 1,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
        state.loading = false;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
