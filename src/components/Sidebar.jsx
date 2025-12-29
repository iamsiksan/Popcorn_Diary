import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome, AiFillHeart } from "react-icons/ai";

import { MdPlaylistAdd } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { MdMovie } from "react-icons/md";

const Sidebar = () => {
  const navItems = [
    { icon: <AiFillHome size={25} />, label: "Home", link: "/" },
    { icon: <MdMovie size={25} />, label: "Movies", link: "/allmovies" },
    {
      icon: <AiFillHeart size={25} />,
      label: "Favorites",
      link: "/favourites",
    },
    {
      icon: <MdPlaylistAdd size={25} />,
      label: "Watchlist",
      link: "/watchlist",
    },
    { icon: <FiUser size={25} />, label: "Profile", link: "/profile" },
  ];

  return (
    <aside
      className=" fixed h-screen  w-20 flex flex-col items-center  py-6
      bg-transparent  m-5 rounded-2xl"
    >
      {/* Navigation */}
      <div className="flex flex-col items-center mt-20 gap-6 flex-1">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.link}
            className={({ isActive }) =>
              `group relative w-11 h-11 flex items-center justify-center
               rounded-full transition-all duration-300
               ${
                 isActive
                   ? "bg-accent text-black shadow-lg"
                   : "text-white/70 hover:text-white hover:bg-white/10"
               }`
            }
          >
            {item.icon}

            {/* Tooltip */}
            <span
              className="absolute left-14 whitespace-nowrap
              bg-black/80 text-white text-xs px-3 py-1 rounded-md
              opacity-0 group-hover:opacity-100 transition"
            >
              {item.label}
            </span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
