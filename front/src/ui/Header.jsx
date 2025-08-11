import Logo from "./Logo";
import { NavLink } from "react-router";

function Header() {
  return (
    //  bg-amber-300
    <header className="bg-[var(--dark-blue)] shadow-md">
      <div className="container flex items-center justify-between ">
        <NavLink
          to="/"
          className="flex gap-2 items-center index-link py-[12px]"
        >
          <Logo height={80} width={80} type="light"></Logo>
          <h1 className="h-min font-['Rubik'] font-bold text-white ">
            What To watch?
          </h1>
        </NavLink>

        <div className="flex items-center gap-4.5 text-white ">
          <NavLink className="header-link" to="/movies">
            Movies
          </NavLink>
          <NavLink className="header-link" to="/anime">
            Anime
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
