import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FaFilm } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-black/90 text-white py-8 px-5 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        
        {/* Left: Logo / Branding */}
        <div className="flex items-center gap-2">
          <div className="text-accent text-2xl font-bold"> <FaFilm className="text-accent text-2xl sm:text-3xl" /></div>
          <p className="text-white font-semibold text-lg">
            Popcorn <span className="text-accent">Diary</span>
          </p>
        </div>

        {/* Center: Links */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm sm:text-base">
          <a href="/" className="hover:text-black text-accent transition-colors">
            Home
          </a>
          <a href="/allmovies" className="hover:text-black text-accent transition-colors">
            Movies
          </a>
          <a href="/favourites" className="hover:text-black text-accent transition-colors">
            Favorites
          </a>
          <a href="/watchlist" className="hover:text-black text-accent transition-colors">
            Watchlist
          </a>
        </div>

        {/* Right: Social Icons */}
        <div className="flex gap-4 text-white">
          <a
            href="#"
            className="hover:text-accent transition-colors"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            className="hover:text-accent transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Bottom: Copyright */}
      <div className="mt-6 text-center text-xs text-white/60">
        &copy; 2025 Popcorn Diary. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
