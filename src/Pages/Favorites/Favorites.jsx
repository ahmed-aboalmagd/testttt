import { MdOutlineFavorite } from 'react-icons/md';
import { useEffect, useState } from 'react';
import axiosInstance from '../../Service/axiosInstance';
import { useDispatch, useSelector } from "react-redux";
import { removeFromFavorite } from '../../Store/slices/favorites';
import { FaHeartBroken } from "react-icons/fa";

const FavoriteMovies = () => {

  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const dispatch = useDispatch();

  const favoriteIds = useSelector((state) => state.favorites.favoriteArr);
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {



        const requests = favoriteIds.map(id =>
          axiosInstance.get(`movie/${id}`)
        );


        const responses = await Promise.all(requests);


        const movies = responses.map(response => response.data);


        setFavoriteMovies(movies);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    };

    fetchFavoriteMovies();
  }, [favoriteIds]);

  // const favoriteArr = useSelector((state) => state.favorites.favoriteArr);
  function handleClick(id) { dispatch(removeFromFavorite(id)) }


  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Your Favorite Movies</h2>

      {favoriteIds.length == 0 ? <p className='flex justify-center text-1xl'>Your Favorites is currently empty <FaHeartBroken className='pl-2' size={30} /> </p> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteMovies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="absolute -bottom-16 right-4 text-red-600" onClick={() => handleClick(movie.id)}>
                <MdOutlineFavorite className="text-red-600 hover:text-red-900 cursor-pointer" size={40} />
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{movie.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{movie.release_date}</p>
              <p className="text-sm text-gray-500 mt-2">
                {movie.adult ? (
                  <span className="text-red-500">+18</span>
                ) : (
                  <span className="text-green-500">All Ages</span>
                )}
              </p>
              <div className="flex items-center mt-3">
                {Array.from({ length: 5 }, (_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${index < Math.round(movie.vote_average / 2)
                      ? 'text-yellow-300'
                      : 'text-gray-300'
                      }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
                <p className="ml-2 text-sm text-gray-500">({movie.vote_count})</p>
              </div>
            </div>
          </div>
        ))}
      </div>}


    </div >
  );
};

export default FavoriteMovies;
