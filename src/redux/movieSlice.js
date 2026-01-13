import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getMoviesApi,
  getMovieByIdApi,
  searchMovieApi,
  getMovieTrailerApi,
} from "../services/movieApi";

// fetch movies with filters
export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (params) => {
    const results = await getMoviesApi(params);
    return results;
  }
);

// search movies

export const searchMovies = createAsyncThunk(
  "movie/searchMovies",
  async ({ query, page }) => {
    const results = await searchMovieApi(query, page);
    return results;
  }
);

// fetch movie by id
export const fetchMovieById = createAsyncThunk(
  "movies/fetchMovieById",
  async (movieId) => {
    const response = await getMovieByIdApi(movieId);
    return response.data;
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

export const fetchMovieTrailer = createAsyncThunk(
  "movie/fetchMovieTrailer",
  async (movieId) => {
    const response = await getMovieTrailerApi(movieId);

    const trailer =
      response.data.results.find(
        (video) =>
          video.site === "YouTube" && video.type === "Trailer" && video.official
      ) || response.data.results.find((video) => video.site === "YouTube");

    return trailer ? trailer.key : null;
  }
);

const initialState = {
  movies: [],
  searchResults: [],
  favourites: [],
  watchlist: [],
  loading: false,
  error: null,
  trailerKey: null,
  trailerLoading: false,
  trailerError: null,
  movieDetails: null,
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
    clearFavouriteList: (state) => {
      state.favourites = null;
    },
    clearWatchList: (state) => {
      state.watchlist = null;
    },
    clearTrailer: (state) => {
      state.trailerKey = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch movies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Search movies
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })

      // Movie details
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload;
      })

      // Movie Trailer
      .addCase(fetchMovieTrailer.pending, (state) => {
        state.trailerLoading = true;
        state.trailerError = null;
      })
      .addCase(fetchMovieTrailer.fulfilled, (state, action) => {
        state.trailerLoading = false;
        state.trailerKey = action.payload;
      })
      .addCase(fetchMovieTrailer.rejected, (state) => {
        state.trailerLoading = false;
        state.trailerError = "Failed to load trailer";
      });

    // Fetch movie by Id
    builder.addCase(fetchMovieById.fulfilled, (state, action) => {
      state.movieDetails = action.payload;
    });
  },
});

export const {
  favourites,
  watchlist,
  addToFavourites,
  removeFromFavourites,
  addToWatchlist,
  removeFromWatchlist,
  clearFavouriteList,
  clearWatchList,
  clearTrailer,
} = movieSlice.actions;
export default movieSlice.reducer;
