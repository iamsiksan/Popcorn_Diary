import React from "react";
import { IMAGE_BASE_URL } from "../services/movieApi";
import { FaStar } from "react-icons/fa";
import { GENRE_MAP } from "../assets/assets";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addToFavourites,
  removeFromFavourites,
  favourites,
} from "../redux/movieSlice";

const MovieCard = ({ movie }) => {
  const isFav = false;

  const genres =
    movie.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  const handleToggleFav = () => {
    if (isFav) {
      removeFromFavourites(movie.id);
    } else {
      addToFavourites(movie);
    }
  };

  return (
    <div
      className="movie-card relative flex flex-col justify-end h-105 max-w-2xs rounded-xl overflow-hidden shadow-md shadow-accent"
      style={{
        backgroundImage: `url(${
          movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "/placeholder.png"
        })`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

      <button
        onClick={handleToggleFav}
        className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition"
      >
        {isFav ? (
          <FaHeart className="text-accent text-lg" />
        ) : (
          <FaRegHeart className="text-white text-lg" />
        )}
      </button>

      {/* Content */}
      <div className="relative z-10 p-4 text-white">
        <h2 className="text-lg font-semibold leading-tight mb-1">
          {movie.title}
        </h2>

        <div className="flex items-center justify-between text-sm opacity-90">
          {/* Year & Genre */}
          <div>
            <p>{movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}</p>
            <p className="text-xs text-gray-300">
              {genres?.join(", ") || "Unknown"}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 border border-accent text-white text-xs px-2 py-1 rounded-md font-normal">
            <FaStar className="text-yellow-400" />{" "}
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
