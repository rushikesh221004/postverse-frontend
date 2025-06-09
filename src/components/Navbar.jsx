import { LuCircleUserRound } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="navbar bg-white py-4 px-8 shadow-sm">
      <div className="navbar-start text-black flex w-full justify-between">
        <div className="navbar-center lg:flex lg:items-center lg:gap-32">
          <a className="btn btn-ghost text-xl text-black">PostVerse</a>
          <div className="hidden lg:flex gap-10">
            <a href="/" className="font-semibold text-black">
              Home
            </a>
            <a href="/create-content" className="font-semibold text-black">
              Create Content
            </a>
          </div>
        </div>
        <div className="dropdown bg-white lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm relative right-0 dropdown-content bg-white rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a href="/" className="font-semibold text-md">Homepage</a>
            </li>
            <li>
              <a href="/create-content" className="font-semibold text-md">Create Content</a>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <LuCircleUserRound className="text-5xl text-gray-500"/>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
