const NavButton = () => {
  return (
    <button
      data-collapse-toggle="navbar-multi-level"
      type="button"
      className="ml-3 inline-flex items-center rounded-lg p-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 hover:bg-gray-700 md:hidden"
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="h-6 w-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  );
};

export default NavButton;
