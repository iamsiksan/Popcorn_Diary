import { BiSearch } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import {Link} from "react-router-dom"
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";

const Topbar = ({ toggleSidebar }) => {
  const movies  = useSelector((state)=> state.movies.movies)


  
  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-10 py-2 sm:py-4 bg-black">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 w-full">
        
        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full sm:w-auto gap-3">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden px-3 py-1 text-white bg-accent rounded-md"
            onClick={toggleSidebar}
          >
            ☰
          </button>

          <Link to="/" >
          <div className="flex items-center space-x-2 sm:space-x-3">
            <FaFilm className="text-accent text-2xl sm:text-3xl" />
            <div className="border-b border-accent rounded-xl px-2 py-1">
              <p className="font-semibold text-lg sm:text-2xl text-white">
                Popcorn <span className="text-accent font-semibold">Diary</span>
              </p>
            </div>
          </div>
          </Link>
        </div>

        {/* Search */}
        <SearchBar movies={movies} />
      </div>
    </div>
  );
};

export default Topbar;
