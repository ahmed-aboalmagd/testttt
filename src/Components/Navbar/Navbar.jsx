/* eslint-disable react/prop-types */
export default function NavLink({ page }) {
  return (
    <li className="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0">
      <a
        className="text-black/60 transition duration-200 hover:text-black/80 focus:text-black/80 active:text-black/80 dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2"
        href="#"
      >
        {page}
      </a>
    </li>
  );
}
