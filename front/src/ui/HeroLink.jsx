import { Link } from "react-router";

function HeroLink({ to, children, type = "movie" }) {
  const typeClasses =
    type === "movie"
      ? "bg-[var(--bright-yellow)] text-[var(--main-blue)] hover:bg-[var(--bright-yellow-hover)] hover:shadow-lg"
      : "bg-[var(--main-red)] text-white hover:bg-[var(--main-red-hover)] hover:shadow-lg";

  return (
    <Link
      className={`p-8 mt-16 rounded-xl  font-semibold shadow-md transition duration-300 ease-in-out inline-block select-none ${typeClasses}`}
      to={to}
    >
      {children}
    </Link>
  );
}
export default HeroLink;
