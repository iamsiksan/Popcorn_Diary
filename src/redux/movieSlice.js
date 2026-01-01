import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMoviesApi, getMovieByIdApi, searchMovieApi } from "../services/movieApi";


// fetch movies with filters
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params)=>{
    const results = await getMoviesApi(params);
    return results;;

});


// search movies

export const searchMovies = createAsyncThunk(
  "movie/searchMovies",
  async ({query,page}) => {
    const results = await searchMovieApi(query, page);
    return results;
  }
);


// movie details

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchmovieDetails",
  async (id) => {
    const movie = await getMovieByIdApi(id);
    return movie;
    
  }
);

const initialState = {
  movies: [],
  searchResults: [],
  favourites: [],
  watchlist: [],
  loading: false,
  error: null
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
    clearFavouriteList: (state)=>{
      state.favourites = null ;

    },
    clearWatchList: (state)=>{
      state.watchlist = null ;

    },
    
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMovies.fulfilled, (state, action) => { state.loading = false; state.movies = action.payload; })
      .addCase(fetchMovies.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })

      // Search movies
      .addCase(searchMovies.pending, (state) => { state.loading = true; })
      .addCase(searchMovies.fulfilled, (state, action) => { state.loading = false; state.searchResults = action.payload; })

      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => { state.loading = true; })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => { state.loading = false; state.movieDetails = action.payload; });
  },
});

export const { favourites,watchlist,addToFavourites,removeFromFavourites,addToWatchlist,removeFromWatchlist,clearFavouriteList,clearWatchList } = movieSlice.actions;
export default movieSlice.reducer;
