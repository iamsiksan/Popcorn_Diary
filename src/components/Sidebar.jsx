import React from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { MdPlaylistAdd, MdMovie } from "react-icons/md";
import { FiUser } from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }) => {
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
      className={`
        fixed left-0 w-20 bg-accent/10 backdrop-blur-md rounded-r-2xl p-4
        z-50 flex flex-col items-center gap-6
        transform transition-transform duration-300
        top-1/2 -translate-y-1/2
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.link}
          className={({ isActive }) =>
            `group relative w-11 h-11 flex items-center justify-center rounded-full transition-all duration-300
             ${
               isActive
                 ? "bg-accent text-black shadow-lg"
                 : "text-white/70 hover:text-white hover:bg-white/10"
             }`
          }
          onClick={() => {
            setTimeout(() => setIsOpen(false), 50);
          }}
        >
          {item.icon}

          {/* Tooltip */}
          <span className="absolute left-14 whitespace-nowrap bg-black/80 text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
            {item.label}
          </span>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
