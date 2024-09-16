import { useState, useEffect } from 'react';
import axiosInstance from '../../Service/axiosInstance';
import TestHookComponent from '../../Components/TestHookComponent/TestHookComponent';

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {


    const fetchMovies = async () => {
      try {


        const response = await axiosInstance.get("/movie/popular", {
          params: {
            page: 1,
          }
        });

        setMovies(response.data.results.slice(0, 4));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-20 flex-grow">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to MovieLand</h1>
            <p className="text-lg mb-8">
              Discover and enjoy the latest movies and TV shows with MovieLand.
              Your gateway to cinematic excellence.
            </p>
            <a
              href="#featured"
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Explore Now
            </a>
          </div>
        </section>

        {/* Featured Movies */}
        <section id="featured" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Featured Movies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {movies.map((movie) => (
                <div
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                  key={movie.id}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {movie.title}
                    </h3>
                    <p className="text-gray-600 mb-4">Release Date: {movie.release_date}</p>
                    <p className="text-gray-700 mb-4">
                      {movie.overview.length > 100
                        ? `${movie.overview.substring(0, 100)}...`
                        : movie.overview}
                    </p>
                    <a
                      href={`https://www.themoviedb.org/movie/${movie.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gray-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6">
              Connect with other movie enthusiasts and stay updated with the
              latest releases and news.
            </p>
            <a
              href="#"
              className="bg-yellow-500 text-gray-800 px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition"
            >
              Sign Up Now
            </a>
          </div>
        </section>
      </div>
      <TestHookComponent />
    </>
  );
}
