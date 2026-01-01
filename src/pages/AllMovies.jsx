import { useEffect, useState} from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchMovies} from "../redux/movieSlice"
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

const AllMovies = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector(state => state.movies);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;


    const handlePageChange = (page) => {
    setCurrentPage(page);
     window.scrollTo({ top: 0, behavior: "smooth" });
    dispatch(fetchMovies({ page })); 
    
  };
  

  useEffect(() => {
    // Dispatch fetchMovies on mount
    dispatch(fetchMovies({ page: 1 })); 
  }, [dispatch]);
  
  

 if (loading)
    return (
      <div className="min-h-[60vh] grid place-items-center text-white">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-[60vh] grid place-items-center text-red-400">
        Error: {error}
      </div>
    );

  return (
    <div className="p-4">

    <div className="grid grid-cols-2  lg:grid-cols-3 gap-y-10 gap-x-5 sm:gap-x-0">
      {movies ? movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      )) : <p>No movies found.</p>}
    </div>
    <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
     />
    </div>
  );
};

export default AllMovies;
