import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import { IMAGE_BASE_URL } from "../services/movieApi";
import { FaStar } from "react-icons/fa";
import { GENRE_MAP } from "../assets/assets";

const Hero = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const displayedMovies = movies?.slice(0, 4);

  const [selectedMovie, setSelectedMovie] = useState();

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
    <div className="relative w-full h-[82vh] text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-90 transition-all duration-500"
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
      <div className="absolute bottom-0 z-10 flex flex-col sm:flex-row gap-5 p-4 sm:p-5 w-full h-auto sm:h-[62%]">
        {/* Movie Details */}
        <div className="w-full sm:w-[70%] md:w-[40%] flex flex-col justify-start mx-auto">
          {selectedMovie && (
            <div className="flex flex-col bg-black/50 rounded-xl p-4 sm:p-5 space-y-4 sm:space-y-5 sm:h-100">
              <div>
                <div className="flex gap-5 items-center">
                  <p>
                    {selectedMovie.release_date
                      ? selectedMovie.release_date.slice(0, 4)
                      : "N/A"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaStar className="text-yellow-400" />
                    {selectedMovie.vote_average.toFixed(1)}
                  </p>
                </div>

                <p className="text-xs text-gray-300">
                  {genres.join(", ") || "Unknown"}
                </p>

                <h2 className="text-2xl sm:text-4xl font-bold">
                  {selectedMovie.title}
                </h2>
              </div>

              <p className="text-sm line-clamp-5 hidden sm:block">
                {selectedMovie.overview}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-auto items-center sm:items-start">
                <button className="w-full sm:w-auto bg-accent rounded-2xl text-sm sm:text-lg font-normal sm:font-medium text-white px-4 py-2 sm:px-7 sm:py-2 transition hover:opacity-90">
                  Trailer
                </button>

                <button className="w-full sm:w-auto border border-accent rounded-2xl text-sm sm:text-lg font-normal sm:font-medium text-white px-4 py-2 sm:px-7 sm:py-2 transition hover:bg-accent/20">
                  View More
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Poster Strip (Tablet & Desktop only) */}
        <div className="hidden sm:flex md:w-2/3 flex-col items-center justify-end">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
            {displayedMovies.map((movie) => (
              <div
                key={movie.id}
                className={`w-24 h-36 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300
                  ${
                    selectedMovie?.id === movie.id
                      ? "border-accent scale-105"
                      : "border-transparent hover:scale-105"
                  }`}
                onClick={() => setSelectedMovie(movie)}
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
  );
};

export default Hero;
