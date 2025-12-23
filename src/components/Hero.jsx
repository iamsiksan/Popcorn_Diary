import { useEffect } from "react";
import { getMoviesApi } from "../services/movieApi";

const Hero = () => {
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getMoviesApi();
      console.log("Movies from TMDB:", movies);
    };
    fetchMovies();
  }, []);

  return <h1>Check the console for movies 🍿</h1>;
};

export default Hero;
