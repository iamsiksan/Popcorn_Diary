import { useState,useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { BiSearch } from "react-icons/bi";
import { IMAGE_BASE_URL } from "../services/movieApi";
import {searchMovies} from "../redux/movieSlice"

const SearchBar = ({ movies }) => {
  const [query, setQuery] = useState("");

 const dispatch = useDispatch();

  const searchResults = useSelector(
    (state) => state.movies.searchResults
  );

  useEffect(() => {
    if (query.trim().length < 2) return;

    dispatch(searchMovies({ query }));
  }, [query, dispatch]);

  return (
    <div className="relative w-full sm:w-auto">
      {/* Search Input */}
      <div className="flex items-center gap-2 sm:gap-5 bg-transparent rounded-2xl px-3 sm:px-5 py-1 sm:py-2 outline outline-accent focus-within:outline-2 transition">
        <BiSearch className="text-white/70 text-lg sm:text-xl" />
        <input
          type="text"
          placeholder="Search for movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent outline-none text-sm sm:text-base text-white placeholder-white/50 w-full"
        />
      </div>

      {/* Recommendation Dropdown */}
      {query && (
        <div className="absolute top-full mt-2 w-full bg-black/90 rounded-xl shadow-lg overflow-hidden z-50">
          {searchResults.length > 0 ? (
            searchResults.slice(0, 6).map((movie) => (
              <div
                key={movie.id}
                className="px-4 py-2 cursor-pointer text-white/90 hover:bg-accent/20 transition"
                onClick={() => setQuery(movie.title)}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : "/placeholder.png"
                    }
                    alt={movie.title}
                    className="w-10 h-14 object-cover rounded"
                  />
                  <span>{movie.title}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-white/50">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
