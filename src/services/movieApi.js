import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
// const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// fetch movies with filter

export const getMoviesApi = async () => {
  try {
    const response = await api.get("/discover/movie", {
      params: {
        sort_by: "popularity.desc",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Search movie by query

export const searchMovieApi = async (query, page = 1) => {
  try {
    const response = await api.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Get movie details by ID
export const getMovieByIdApi = async (id) => {
  try {
    const response = await api.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};
