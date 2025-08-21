import { Link } from "react-router";

function HeroLink({ to, children, type = "movie" }) {
  const typeClasses =
    type === "movie"
      ? "bg-bright-yellow text-dark-blue hover:bg-bright-yellow-hover hover:shadow-lg"
      : "bg-main-red text-white hover:bg-main-red-hover hover:shadow-lg";

  return (
    <Link
      to={to}
      className={`p-8 mt-16 rounded-xl font-semibold shadow-md transition duration-300 ease-in-out inline-block select-none ${typeClasses}`}
    >
      {children}
    </Link>
  );
}
export default HeroLink;
