import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useState } from "react";
import Favourites from "./pages/Favourites";
import WatchList from "./pages/WatchList";
import AllMovies from "./pages/AllMovies";
import Profile from "./pages/Profile";


function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <Routes>
      
      <Route element={<AuthLayout isLoggedIn={loggedIn} />}>
        <Route path="/login" element={<Login setLoggedIn={setLoggedIn}  />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      <Route element={<ProtectedLayout isLoggedIn={loggedIn} />}>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/allmovies" element={<AllMovies />} />
          <Route path="/allmovies/id" element={<MovieDetails />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
