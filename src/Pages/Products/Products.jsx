import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdFavoriteBorder, MdOutlineFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFromFavorite } from '../../Store/slices/favorites';
import { themeContext } from "../../contexts/theme";
import { fetchMovies } from "../../Store/slices/movies";
// import { selectLanguage } from "../../Store/slices/language";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchValue = searchParams.get("query");

  const [page, setPage] = useState(1);

  const { movies, totalPages, loading, error } = useSelector((state) => state.movies);
  // const language = useSelector(selectLanguage);
  useEffect(() => {
    dispatch(fetchMovies({ page, searchValue }));
  }, [page, searchValue, dispatch]);

  const favoriteArr = useSelector((state) => state.favorites.favoriteArr);
  const [isAdded, setIsAdded] = useState(false);

  const handleClickFavorite = (e, id) => {
    e.stopPropagation();
    setIsAdded(!isAdded);

    const isFavorite = favoriteArr.includes(id);
    if (isFavorite) {
      dispatch(removeFromFavorite(id));
    } else {
      dispatch(addToFavorite(id));
    }
  };

  const { theme } = useContext(themeContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={`${theme === "light" ? "bg-gray-100" : "bg-blue-100"}`}>
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Popular Movies
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {movies.map((movie) => (
            <div
              className="group relative"
              key={movie.id}
              onClick={() => navigate(`/products/${movie.id}`)}
            >
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="relative mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span>{movie.title}</span>
                  </h3>
                  {movie.adult && (
                    <p className="text-sm font-medium text-red-500">+18</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500 mb-1">
                    Released on {movie.release_date}
                  </p>
                  <div
                    className="absolute cursor-pointer right-0 top-6 text-2xl hover:text-red-900 hover:blur-sm hover:scale-110 transition-all duration-300 ease-in-out"
                    onClick={(e) => handleClickFavorite(e, movie.id)}
                  >
                    {favoriteArr.includes(movie.id) ? (
                      <MdOutlineFavorite className="text-red-600" />
                    ) : (
                      <MdFavoriteBorder />
                    )}
                  </div>

                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < Math.round(movie.vote_average / 2)
                          ? "text-yellow-300"
                          : "text-gray-300"
                          } me-1`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    ))}
                    <p className="ms-1 text-sm font-medium text-gray-500">
                      ({movie.vote_count})
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center mb-5">
        <button
          className="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          <svg
            className="w-3.5 h-3.5 me-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 5H1m0 0 4 4M1 5l4-4"
            />
          </svg>
          Previous
        </button>
        <button
          className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
