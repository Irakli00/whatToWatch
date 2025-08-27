import Logo from "./Logo";
import { NavLink } from "react-router";

function Header() {
  return (
    //  bg-amber-300
    <header className="bg-dark-blue shadow-md">
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="flex gap-2 items-center py-3">
          <Logo height={80} width={80} type="light" />
          <h1 className="h-min font-bold text-white font-sans">
            What To Watch?
          </h1>
        </NavLink>

        <div className="flex items-center gap-4.5 text-white">
          <NavLink
            to="/selectMovies"
            className={({ isActive }) =>
              `header-link 
           ${isActive ? "bg-bright-yellow text-dark-blue" : "hover:bg-bright-yellow hover:text-dark-blue"}`
            }
          >
            Select a Movie
          </NavLink>

          <NavLink
            to="/selectAnimes"
            className={({ isActive }) =>
              `header-link 
           ${isActive ? "bg-main-red text-white" : "hover:bg-main-red hover:text-white"}`
            }
          >
            Seclect an Anime
          </NavLink>

          <NavLink
            to="/TVs"
            className={({ isActive }) =>
              `header-link 
           ${isActive ? "bg-light-blue text-dark-blue" : "hover:bg-light-blue hover:text-dark-blue"}`
            }
          >
            Select a TV Show
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
