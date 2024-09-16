import { Link, useNavigate } from "react-router-dom";
import NavLink from "../Navbar/Navbar";
import { useContext, useState } from "react";
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { useSelector } from "react-redux";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineDarkMode } from "react-icons/md";
import { themeContext } from "../../contexts/theme";
import { MdDarkMode } from "react-icons/md";
import { langContext } from "../../contexts/language";
import { useTranslation } from "react-i18next";
import i18n from "../../Service/i18n";

// import { setLanguage } from "../../Store/slices/language";

export default function Header() {
  const [searchInputData, setSearchInputData] = useState("");
  const { theme, setTheme } = useContext(themeContext)
  const { lang, setLang } = useContext(langContext);


  function handleSearchInput(e) {
    setSearchInputData(e.target.value);
  }

  const navigate = useNavigate();

  function handleSearchButton() {
    if (searchInputData.trim()) {
      navigate(`/products?query=${searchInputData}`);
    }
  }

  // for animation of the logo 💹
  useEffect(() => {
    animateLogo();
  }, []); // Empty dependency array ensures this runs only once after initial render

  const animateLogo = () => {
    gsap.fromTo(
      '.logo',
      { opacity: 0, scale: 0.5, rotation: 0 },
      {
        opacity: 1,
        scale: 1,
        rotation: 360,
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        repeat: -1,
        // yoyo: true, // Uncomment if you want the animation to reverse
      }
    );
  }

  const favoriteArr = useSelector((state) => state.favorites.favoriteArr);

  // 118next change language
  const { t } = useTranslation();

  return (
    <nav className="sticky z-50 top-0 flex w-full items-center justify-between bg-zinc-50 py-2 shadow dark:bg-neutral-700 lg:flex-wrap lg:justify-start lg:py-4"  >

      <div className="flex w-full flex-wrap items-center justify-between px-3" >


        <div
          className={`mt-2 flex-grow basis-[100%] items-center lg:mt-0 lg:flex lg:basis-auto  `}
          id="navbarSupportedContent15"
        >
          <div className="ms-2 md:me-2 logo" onClick={() => navigate("/products")}>
            <a className="text-xl text-black dark:text-white" href="">
              Sabry
            </a>
          </div>

          <ul className="list-none me-auto flex flex-col ps-0 lg:mt-1 lg:flex-row">
            <Link to="/">
              <NavLink page={t("home")} />
            </Link>

            <Link to="/products">
              <NavLink page={t("movies")} />
            </Link>

            <Link to="/about">
              <NavLink page={t("about_us")} />
            </Link>

            <Link to="/contact">
              <NavLink page={t("contact_us")} />
            </Link>
            {/* 
            <Link to="/verify-email">
              <NavLink page="verification" />
            </Link> */}
            <div className="relative flex items-center cursor-pointer" onClick={() => { navigate("/favorites") }}>
              <GrFavorite className="text-gray-300 text-2xl" size={25} />
              <span className="absolute bottom-0 left-0 translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-sm font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favoriteArr.length}
              </span>
            </div>
          </ul>

          <div className="w-[400px] lg:pe-2 ">
            <div className="relative flex w-full flex-wrap items-stretch">
              <input
                type="search"
                className="relative block w-[1px]  flex-auto rounded-r border border-solid border-gray-300 bg-transparent px-3 py-1 text-base leading-5 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:text-gray-900 focus:outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-gray-400 rounded-full "
                placeholder="Search"
                aria-label="Search"
                value={searchInputData}
                onChange={(e) => handleSearchInput(e)}
              />
              <button
                className="relative z-2 rounded-l rounded-full border-2  border-l-0 border-primary px-6 pb-1 pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-100 focus:text-primary-700 focus:outline-none text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                type="button"
                onClick={handleSearchButton}
              >
                {t("search_button")}
              </button>
            </div>
          </div>

          <div>
            <button
              className=" z-2 rounded-r border-2 border-primary px-6 pb-1 pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-100 focus:text-primary-700 focus:outline-none text-white dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
              type="button"
              onClick={() => navigate("/Login")}
            >
              {t("login")}
            </button>
          </div>

          <div className="m-1 bg-slate-200 hover:bg-slate-300 transition duration-150 rounded-full cursor-pointer p-2" onClick={() => {
            theme == "light" ? setTheme("dark") : setTheme("light");
            console.log(theme);

          }}>{theme == "light" ? <MdOutlineDarkMode /> : <MdDarkMode />}
          </div>
          <div className="Language flex justify-center w-7  rounded-md bg-yellow-200 p-1 cursor-pointer hover:bg-yellow-300 transition duration-75" onClick={() => {
            const newLang = lang === "en" ? "ar" : "en";
            i18n.changeLanguage(newLang);
            setLang(newLang);
          }}>
            {lang}
          </div>
        </div>

      </div>

    </nav>
  );
}
