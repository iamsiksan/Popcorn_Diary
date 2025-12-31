import { BiSearch } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";
import {Link} from "react-router-dom"

const Topbar = ({ toggleSidebar }) => {
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
        <div className="flex items-center gap-2 sm:gap-5 w-full sm:w-auto bg-transparent rounded-2xl px-3 sm:px-5 py-1 sm:py-2 outline outline-accent focus-within:outline-2 transition">
          <BiSearch className="text-white/70 text-lg sm:text-xl" />
          <input
            type="text"
            placeholder="Search for movie..."
            className="bg-transparent outline-none text-sm sm:text-base text-white placeholder-white/50 w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
