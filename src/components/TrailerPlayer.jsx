import { useDispatch, useSelector } from "react-redux";
import { clearTrailer } from "../redux/movieSlice";

const TrailerPlayer = () => {
  const dispatch = useDispatch();
  const { trailerKey, trailerLoading } = useSelector((state) => state.movies);

  if (trailerLoading) return null; // or a spinner
  if (!trailerKey) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70"
    >
      {/* Close Button */}
      <button
        onClick={() => dispatch(clearTrailer())}
        className="absolute top-6 right-6 text-white text-3xl cursor-pointer  font-bold hover:text-red-500"
      >
        ✕
      </button>

      {/* Trailer iframe */}
      <div className="w-[90%] max-w-4xl aspect-video shadow-2xl rounded-xl overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="Movie Trailer"
          allow="autoplay; encrypted-media"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default TrailerPlayer;
