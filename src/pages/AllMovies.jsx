import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovies} from "../redux/movieSlice"
import MovieCard from "../components/MovieCard";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(state => state.movies);
  console.log(movies);
  

  useEffect(() => {
    // Dispatch fetchMovies on mount
    dispatch(fetchMovies({ page: 1 })); 
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">

    <div className="grid grid-cols-2  lg:grid-cols-3 gap-y-10 gap-x-5 sm:gap-x-0">
      {movies ? movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      )) : <p>No movies found.</p>}
    </div>
    </div>
  );
};

export default AllMovies;
