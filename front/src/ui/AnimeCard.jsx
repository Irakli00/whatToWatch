import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { getAnimeGenres } from "../services/kistuApi";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import { parseGenres } from "../helpers/formaters";
import { KITSU_GENRES } from "../services/kistuApi";
import { AppContext } from "../contexts/AppContext";

function AnimeCard({ anime, height = "100%", padding = "10px" }) {
  const { clientAnimePreferences } = useContext(AppContext);

  const {
    type,
    id,
    attributes: {
      titles,
      synopsis: overview,
      posterImage: { large: largeImg },
    },
  } = anime;

  const {
    data: genreStrings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["animeGenres", id],
    queryFn: async () => {
      const json = await getAnimeGenres(
        id,
        clientAnimePreferences.mediaType || "anime"
      );

      const genreIds = json.map((el) => el.id);

      return parseGenres(genreIds, KITSU_GENRES);
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading Recomendations...</p>;
  if (error) return <p>Error loading genres</p>;

  return (
    <article style={{ height, padding }} className="card card--anime">
      <div className="h-full">
        <img
          draggable="false"
          src={largeImg}
          alt={titles.en}
          className="max-w-[180px] h-full rounded-[7px]"
        />
      </div>

      <div className="flex flex-col gap-[7px]">
        <h2 className="text-2xl leading-[0.9]">
          <strong>{titles.en || titles.en_jp}</strong>
        </h2>

        <h1>{type.toUpperCase()}</h1>

        <ul className="flex flex-wrap gap-1 leading-3">
          {genreStrings.map((g, i) => (
            <li key={i}>
              <i>{g}</i>
            </li>
          ))}
        </ul>

        <p className="flex items-center gap-0.5 text-center">
          <IoCalendarClearOutline />
          <span className="pt-0.5">{"anime.startDate"}</span>
        </p>

        <p className="flex items-center gap-0.5 text-center">
          <FaRegStar />
          <span className="pt-0.5">{"rating"}</span>
        </p>

        <div className="overflow-scroll pt-1 border-t border-dark-blue h-full rounded-b-[5px]">
          <p className="select-none text-[14px] opacity-75">{overview}</p>
        </div>
      </div>
    </article>
  );
}

export default AnimeCard;
