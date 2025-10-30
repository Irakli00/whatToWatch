import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router";

import { cn } from "@/lib/utils";

function GenreLink({ type = "movie", genre }) {
  const {
    clientMoviePreferences,
    setClientMoviePreferences,
    clientAnimePreferences,
    setClientAnimePreferences,
  } = useContext(AppContext);

  const lookUpObj = {
    movie: {
      bg: `bright-yellow`,
      color: "dark-blue",
      onClick: (genre) =>
        setClientMoviePreferences({
          ...clientMoviePreferences,
          genres: [genre.id],
        }),
    },
    anime: {
      bg: `main-red`,
      color: "white",
      onClick: (genre) =>
        setClientAnimePreferences({
          ...clientAnimePreferences,
          genres: [genre],
        }),
    },
  };

  const navigate = useNavigate();

  return (
    <button
      className={cn(
        `py-1 px-2 rounded-sm border-1 font-bold text-dark-blue transition-all duration-00 ease-in hover:bg-${lookUpObj[type].bg} hover:text-${lookUpObj[type].color} hover:border-${lookUpObj[type].color}`
      )}
      onClick={() => {
        lookUpObj[type].onClick(genre);

        navigate(`/recomendations/${type}s`);
      }}
    >
      {type === "movie" ? genre.name : genre}
    </button>
  );
}

export default GenreLink;
