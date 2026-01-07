import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../services/movieApi";
import { GENRE_MAP } from "../assets/assets";
import { FaStar, FaHeart, FaRegHeart, FaTimes } from "react-icons/fa";
import {
  addToFavourites,
  removeFromFavourites,
  addToWatchlist,
  removeFromWatchlist,
} from "../redux/movieSlice";
import { useNavigate } from "react-router-dom";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies.movies);
  const favourites = useSelector((state) => state.movies.favourites);
  const watchlist = useSelector((state) => state.movies.watchlist);

  const movie = movies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-white">
        Movie not found
      </div>
    );
  }

  const isFav = favourites.some((fav) => fav.id === movie.id);
  const isWatchlist = watchlist.some((w) => w.id === movie.id);

  const genres =
    movie.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  const handleToggleFav = () => {
    isFav
      ? dispatch(removeFromFavourites(movie.id))
      : dispatch(addToFavourites(movie));
  };

  const handleWatchlist = () => {
    isWatchlist
      ? dispatch(removeFromWatchlist(movie.id))
      : dispatch(addToWatchlist(movie));
  };

  return (
    <div
      className="relative min-h-screen text-white"
      style={{
        backgroundImage: `url(${
          movie.backdrop_path
            ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
            : `${IMAGE_BASE_URL}${movie.poster_path}`
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Cross Button  */}
      <button
          onClick={() => navigate(-1)}
          className="absolute top-5 right-5 z-20 p-3 rounded-full cursor-pointer bg-black/60 hover:bg-black/80 transition"
          aria-label="Close"
        >
          <FaTimes className="text-white text-lg" />
        </button>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Poster */}

        <div className="flex justify-center">
          <img
            src={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title}
            className="rounded-xl shadow-lg shadow-accent max-w-xs"
          />
        </div>
        

        {/* Details */}
        <div className="md:col-span-2 space-y-5">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold">{movie.title}</h1>

            <button
              onClick={handleToggleFav}
              className="p-3 rounded-full bg-black/50 hover:bg-black/70 transition"
            >
              {isFav ? (
                <FaHeart className="text-accent text-xl" />
              ) : (
                <FaRegHeart className="text-white text-xl" />
              )}
            </button>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <span>{movie.release_date?.slice(0, 4)}</span>
            <span>{genres.join(", ") || "Unknown"}</span>
            <span className="flex items-center gap-1 border border-accent px-2 py-1 rounded-md text-white">
              <FaStar className="text-yellow-400" />
              {movie.vote_average.toFixed(1)}
            </span>
          </div>

          {/* Overview */}
          <p className="text-gray-200 leading-relaxed">
            {movie.overview || "No description available."}
          </p>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleWatchlist}
              className={`px-6 py-3 rounded-2xl border border-accent transition
              ${
                isWatchlist
                  ? "shadow-md shadow-accent"
                  : "bg-accent/80 hover:bg-accent/30"
              }`}
            >
              {isWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
