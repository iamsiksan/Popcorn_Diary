import React, { lazy } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErrorBoundary"

const Home = lazy(() => import("./pages/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Favourites = lazy(() => import("./pages/Favourites"));
const WatchList = lazy(() => import("./pages/WatchList"));
const AllMovies = lazy(() => import("./pages/AllMovies"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(true);
  return (
    <ErrorBoundary>

    
    <Suspense fallback="Loading">
      <Routes>
        <Route element={<AuthLayout isLoggedIn={loggedIn} />}>
          <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
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
    </Suspense>
    </ErrorBoundary>
  );
}

export default AppRouter;
