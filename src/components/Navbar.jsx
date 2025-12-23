import React from "react";
import {assets} from '../assets/assets'
import { AiFillHome, AiFillHeart } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { MdPlaylistAdd } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { icon: <AiFillHome size={24} />, label: "Home", link: "/" },
    { icon: <BiSearch size={24} />, label: "Search" , link: "/"},
    { icon: <AiFillHeart size={24} />, label: "Favorites" , link: "/favourites"},
    { icon: <MdPlaylistAdd size={24} />, label: "Watchlist", link: "/watchlist" },
  ];

  return (
    <nav className="flex items-center justify-between bg-dark  px-6 py-3 ">
      
      {/* Left: Logo */}
      <div className="flex items-center">
        

        <img
          src={assets.Popcorn_black}
          alt="Popcorn Diary Logo"
          className="h-35 w-35 cursor-pointer"
        />
        
      </div>
        
      {/* Center: Nav Buttons */}
      <div className="flex items-center space-x-6 bg-black shadow-md shadow-gray-50/10 rounded-lg">
        {navItems.map((item, index) => (
          <div key={index} className="relative group">
            <Link to={item.link}>
            <button className="w-12 h-12 cursor-pointer flex items-center justify-center rounded-full text-white hover:-translate-y-1 transition-transform duration-300">
              {item.icon}
            </button>
            </Link>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Right: Profile Icon */}
      <div className="flex items-center">
        <button className="w-12 h-12 flex items-center justify-center rounded-full text-white hover:-translate-y-1 transition-transform duration-300">
          <FiUser className="cursor-pointer" size={24} />
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
