import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";
import { getAnimeGenres } from "../services/kistuApi";

import { parseGenres } from "../helpers/formaters";
import { KITSU_GENRES } from "../helpers/kitsu";
import { useQuery } from "@tanstack/react-query";

function AnimeCard({ anime }) {
  const {
    type,
    id,
    attributes: {
      slug: title,
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
      const json = await getAnimeGenres(id, "manga");

      const genreIds = json.map((el) => el.id);

      return parseGenres(genreIds, KITSU_GENRES);
    },
    enabled: !!id,
  });

  if (isLoading) return <p>Loading Recomendations...</p>;
  if (error) return <p>Error loading genres</p>;

  return (
    <article className="flex gap-1.5 cursor-pointer rounded-[6px] h-[270px] p-2.5 transition duration-200 ease-in-out hover:bg-[var(--bright-yellow)]">
      <div className="h-full">
        <img
          src={largeImg}
          alt={title}
          className="max-w-[180px] h-full rounded-[7px]"
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <h2 className="text-2xl leading-[0.9]">
          <strong>{title}</strong>
        </h2>

        <h1>{type.toUpperCase()} </h1>
        <ul className="flex flex-wrap gap-1 leading-3">
          {genreStrings.map((g, i) => (
            <li key={i}>
              <i>{g}</i>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-0.5 text-center">
          <IoCalendarClearOutline />
          {/* <span className="pt-0.5">{formatDate(anime.release_date)}</span> */}
          <span className="pt-0.5">{"2020"}</span>
        </p>
        <p className="flex items-center gap-0.5 text-center">
          <FaRegStar />
          <span className="pt-0.5">{"2020"}</span>
          {/* <span className="pt-0.5">{formatRating(anime.vote_average)}</span> */}
        </p>
        <div className="overflow-scroll pt-1 border-t-1 border-t-[var(--dark-blue)] h-full  rounded-b-[5px] ">
          <p className="select-none text-[14px] opacity-75">{overview}</p>
        </div>
      </div>
    </article>
  );
}

export default AnimeCard;
