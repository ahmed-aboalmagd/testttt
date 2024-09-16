import { useEffect, useState } from "react";
import axiosInstance from "../../Service/axiosInstance";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`movie/${movieId}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => console.log(err));
  }, [movieId]);

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-80 "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-32 h-auto rounded-md shadow-md"
            />
            <div className="ml-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {movie.title}
              </h1>
              <p className="text-gray-700 mt-1">{movie.release_date}</p>
              <p className="text-gray-600 mt-2">{movie.runtime} min</p>
              <p className="text-yellow-500 mt-2 flex items-center">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.round(movie.vote_average / 2)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27l5.18 3.03-1.39-5.77L21 9.24l-6.05-.52L12 2 9.05 8.72 3 9.24l4.21 4.32-1.39 5.77L12 17.27z" />
                  </svg>
                ))}
                <span className="ml-2">({movie.vote_count})</span>
              </p>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-semibold text-gray-900">Overview</h2>
            <p className="text-gray-700 mt-2">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
