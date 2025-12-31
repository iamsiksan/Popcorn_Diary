import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";



function WatchList() {

  const {watchlist, loading, error} = useSelector((state)=>state.movies)
  console.log(watchlist);
  

 if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;



  return (
    <div className="p-4">

    <div className="grid grid-cols-2  lg:grid-cols-3 gap-y-10 gap-x-5 sm:gap-x-0">
      {watchlist.length > 0 ? watchlist.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      )) : <p className="text-white">No movies found.</p>
      }
    </div>
    </div>
  );
}

export default WatchList;
