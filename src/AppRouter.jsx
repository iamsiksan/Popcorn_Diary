import React, { lazy } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { Suspense } from "react";
// import ErrorBoundary from "./components/ErrorBoundary"
import ErrorBoundaryWrapper from "./ErrorHandling/ErrorBoundaryWrapper";
import TrailerPlayer from "./components/TrailerPlayer";

const Home = ErrorBoundaryWrapper( React.lazy(() => import("./pages/Home")));
const MovieDetails = ErrorBoundaryWrapper( React.lazy(() => import("./pages/MovieDetails")));
const Favourites = ErrorBoundaryWrapper( React.lazy(() => import("./pages/Favourites")));
const WatchList = ErrorBoundaryWrapper( React.lazy(() => import("./pages/WatchList")));
const AllMovies = ErrorBoundaryWrapper( React.lazy(() => import("./pages/AllMovies")));
const Profile = ErrorBoundaryWrapper( React.lazy(() => import("./pages/Profile")));
const Login = ErrorBoundaryWrapper( React.lazy(() => import("./pages/Login")));
const Signup = ErrorBoundaryWrapper( React.lazy(() => import("./pages/Signup")));

function AppRouter() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    

    
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
            <Route path="/allmovies/:id" element={<MovieDetails />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/watchlist" element={<WatchList />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
      <TrailerPlayer />
    </Suspense>
    
  );
}

export default AppRouter;
