import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

import { formatRating, parseGenres } from "../helpers/formaters";
import { KITSU_GENRES } from "../services/kistuApi";

function AnimeCard({ anime, height = "100%", padding = "10px" }) {
  const {
    type,
    attributes: {
      titles,
      synopsis: overview,
      averageRating: rating,
      // posterImage: { large: largeImg },
      posterImage = {},
    },
  } = anime;

  const largeImg = posterImage?.large || "imagenotfoundurl";
  const genreIds = anime.relationships.genres.data.map((el) => el.id);

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
          {parseGenres(genreIds, KITSU_GENRES).map((g, i) => (
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
          <span className="pt-0.5">{formatRating(rating / 10)}</span>
        </p>

        <div className="overflow-scroll pt-1 border-t border-dark-blue h-full rounded-b-[5px]">
          <p className="select-none text-[14px] opacity-75">{overview}</p>
        </div>
      </div>
    </article>
  );
}

export default AnimeCard;
