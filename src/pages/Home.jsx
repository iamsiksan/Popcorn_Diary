import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/movieSlice";
import { IMAGE_BASE_URL } from "../services/movieApi";
import { FaStar } from "react-icons/fa";
import { GENRE_MAP } from "../assets/assets";

const Home = () => {
  const dispatch = useDispatch();
  const { movies, loading, error } = useSelector((state) => state.movies);
  const displayedMovies = movies?.slice(0, 5);
  console.log(displayedMovies);

  const [selectedMovie, setSelectedMovie] = useState();
  
  
  const genres =
     selectedMovie?.genre_ids?.map((id) => GENRE_MAP[id]).filter(Boolean) || [];

  useEffect(() => {
    if (movies && movies.length > 0) {
      setSelectedMovie(movies[0]);
    }
  }, [movies]);
  console.log(selectedMovie);

  useEffect(() => {
    // Dispatch fetchMovies on mount
    dispatch(fetchMovies({ page: 1 }));
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full h-[82vh] text-white overflow-hidden  ">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-90 transition-all duration-500"
        style={{
          backgroundImage: `url(${
            selectedMovie
              ? `${IMAGE_BASE_URL}${selectedMovie.backdrop_path}`
              : "/default-bg.jpg"
          })`,
        }}
      ></div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* Content */}
      <div className="absolute bottom-0  z-10 flex  justify-end p-5 space-x-5 w-full   ">
        {/* Left: Movie Details */}
        <div className="md:w-[40%]  flex flex-col justify-start">
          {selectedMovie && (
            <div className="p-5 bg-black/50 rounded-xl space-y-5">
              <div className="flex space-x-5 justify-start">
                <p className="mb-2">
                  {" "}
                  {selectedMovie.release_date
                    ? selectedMovie.release_date.slice(0, 4)
                    : "N/A"}
                </p>
                <p className="mb-2 flex items-center gap-x-2">
                  <FaStar className="text-yellow-400" />
                  {selectedMovie.vote_average.toFixed(1)}
                </p>
              </div>
              <p className="text-xs text-gray-300">
              {genres?.join(", ") || "Unknown"}
            </p>
              <h2 className="text-4xl font-bold mb-4">{selectedMovie.title}</h2>
              <p className="text-sm ">{selectedMovie.overview}</p>
              <div className="flex justify-between">
                <button className="bg-accent rounded-2xl font-medium cursor-pointer text-white px-7 py-2">
                  Trailer
                </button>
                <button className="border border-accent rounded-2xl font-medium cursor-pointer text-white px-7 py-2">
                  View More
                </button>
              </div>
            </div>
          )}
        </div>

        {/*  Bottom: Small movie boxes */}
        <div className="md:w-2/3 flex flex-col justify-end">
          <div className="flex gap-x-4 ">
            {displayedMovies.map((movie) => (
              <div
                key={movie.id}
                className={`w-24 h-36 shrink-0 cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300
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

export default Home;
