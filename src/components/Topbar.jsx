import { BiSearch } from "react-icons/bi";
import { FaFilm } from "react-icons/fa";    

const TopBar = () => {
  return (
    <div className="w-full h-[10vh] ">
        <div className="px-10 py-4 mb-10 flex items-center justify-between w-full">

      {/* Logo */}
      <div className=" flex items-center justify-center  space-x-3">
        <FaFilm className="text-accent text-2xl" size={35} />
        <div className=" border-b border-accent rounded-xl px-2 py-1">
            <p className="font-semibold text-2xl text-white">Popcorn <span className="text-accent text-2xl  font-semibold">Diary</span></p>
        </div>
      </div>
     <div className="flex gap-5 bg-transparent rounded-2xl px-5 py-2 outline  outline-accent focus:outline-[0.5px]">

        <BiSearch className="text-white/70 text-lg" />
        <input
          type="text"
          placeholder="Search for movie..."
          className="bg-transparent outline-none text-sm text-white placeholder-white/50 w-full "
        />
      </div>
      </div>
        </div>
    
  );
};

export default TopBar;
