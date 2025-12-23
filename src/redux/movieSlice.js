import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  favourites: [],
  watchlist: [],
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.favourites = state.favourites.filter(
        (movie) => movie.id !== action.payload
      );
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.id !== action.payload
      );
    },
  },
});

export const { addToFavourites,removeFromFavourites,addToWatchlist,removeFromWatchlist } = movieSlice.actions;
export default movieSlice.reducer;
