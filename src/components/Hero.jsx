import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies,fetchMovieTrailer } from "../redux/movieSlice";
import { IMAGE_BASE_URL } from "../services/movieApi";
import { FaStar } from "react-icons/fa";
import { GENRE_MAP } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const displayedMovies = movies?.slice(0, 4);

  const [selectedMovie, setSelectedMovie] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);

  const genres =
    selectedMovie?.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0]);
    }
  }, [movies]);

  useEffect(() => {
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  // Auto scroll for mobile - 1 second timeout
  useEffect(() => {
    if (displayedMovies && displayedMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = (prev + 1) % displayedMovies.length;
          setSelectedMovie(displayedMovies[nextIndex]);
          return nextIndex;
        });
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [displayedMovies]);

  const handleMovieSelect = (movie, index) => {
    setSelectedMovie(movie);
    setCurrentIndex(index);
  };

  const handleWatchTrailer = (e) => {
    e.stopPropagation(); 
    dispatch(fetchMovieTrailer(selectedMovie.id));
  };

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
    <>
      {/* Mobile Design */}
      <div className="md:hidden w-full text-white bg-black">
        {/* Horizontal Auto-Scrolling Posters */}
        <div className="relative h-[50vh] overflow-hidden">
          <div
            className="flex transition-transform duration-2000 ease-in-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {displayedMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="min-w-full h-full relative cursor-pointer"
                onClick={() => handleMovieSelect(movie, index)}
              >
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${IMAGE_BASE_URL}${movie.poster_path})`,
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {displayedMovies.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleMovieSelect(displayedMovies[index], index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-accent w-8"
                    : "bg-white/50 w-2"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Movie Details Below */}
        {selectedMovie && (
          <div className="px-5 py-6 space-y-4">
            {/* Title */}
            <h2 className="text-2xl font-bold leading-tight">
              {selectedMovie.title}
            </h2>

            {/* Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center text-sm">
                <span className="font-medium">
                  {selectedMovie.release_date?.slice(0, 4) || "N/A"}
                </span>
                <span className="text-gray-400 text-xs">
                  {genres.slice(0, 2).join(", ") || "Unknown"}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="flex items-center gap-1.5 border border-accent text-white text-xs px-3 py-1.5 rounded-md">
                <FaStar className="text-yellow-400" />
                {selectedMovie.vote_average.toFixed(1)}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
              {selectedMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
              onClick={handleWatchTrailer}
               className="flex-1 bg-accent rounded-xl text-sm font-medium px-5 py-3 transition hover:opacity-90">
                Trailer
              </button>
              <button
                onClick={() => navigate(`/allmovies/${selectedMovie.id}`)}
                className="flex-1 border-2 border-accent rounded-xl text-sm font-medium px-5 py-3 transition hover:bg-accent/20"
              >
                View Details
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tablet & Desktop Design */}
      <div className="hidden md:block relative w-full h-[70vh] lg:h-[80vh] text-white overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center brightness-90 transition-all duration-2000"
          style={{
            backgroundImage: `url(${
              selectedMovie
                ? `${IMAGE_BASE_URL}${selectedMovie.backdrop_path}`
                : "/default-bg.jpg"
            })`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end z-10 p-6 lg:p-8">
          <div className="w-full flex flex-row gap-6">
            {/* Movie Details */}
            <div className="w-1/2 lg:w-2/5">
              {selectedMovie && (
                <div className="flex flex-col space-y-4 bg-black/50 rounded-xl p-5 lg:p-6">
                  <div className="flex gap-4 items-center text-base">
                    <span className="font-medium">
                      {selectedMovie.release_date?.slice(0, 4) || "N/A"}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaStar className="text-yellow-400 text-sm" />
                      {selectedMovie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-gray-300 text-sm">
                      {genres.slice(0, 2).join(", ") || "Unknown"}
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    {selectedMovie.title}
                  </h2>

                  <p className="text-base line-clamp-4 text-gray-200">
                    {selectedMovie.overview}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <button
                    onClick={handleWatchTrailer}
                     className="bg-accent rounded-xl text-base font-medium px-8 py-3 transition hover:opacity-90">
                      Trailer
                    </button>
                    <button
                      onClick={() => navigate(`/allmovies/${selectedMovie.id}`)}
                      className="border-2 border-white/80 rounded-xl text-base font-medium px-8 py-3 transition hover:bg-white/10"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Poster Strip */}
            <div className="w-1/2 lg:w-3/5 flex items-end justify-center lg:justify-end">
              <div className="flex gap-3 lg:gap-4">
                {displayedMovies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className={`w-20 h-28 lg:w-28 lg:h-40 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedMovie?.id === movie.id
                        ? "border-accent scale-105 shadow-lg shadow-accent/50"
                        : "border-white/20 hover:scale-105 hover:border-white/40"
                    }`}
                    onClick={() => handleMovieSelect(movie, index)}
                  >
                    <img
                      src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;