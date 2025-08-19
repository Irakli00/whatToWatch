import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

import { parseGenres, formatDate } from "../helpers/formaters.js";
import { TMDB_GENRES } from "../helpers/tmdb.js";
import { formatRating } from "../helpers/formaters.js";

function MovieCard({ movie }) {
  const genreStrings = parseGenres(movie.genre_ids, TMDB_GENRES);

  return (
    <article className="card card--movie">
      <div className="h-full">
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title}
          className="max-w-[180px] h-full rounded-[7px]"
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <h2 className="text-2xl leading-[0.9]">
          <strong>{movie.title}</strong>
        </h2>

        <ul className="flex flex-wrap gap-1 leading-3">
          {genreStrings.map((g, i) => (
            <li key={i}>
              <i>{g}</i>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-0.5 text-center">
          <IoCalendarClearOutline />
          <span className="pt-0.5">{formatDate(movie.release_date)}</span>
        </p>
        <p className="flex items-center gap-0.5 text-center">
          <FaRegStar />
          <span className="pt-0.5">{formatRating(movie.vote_average)}</span>
        </p>
        <div className="overflow-scroll pt-1 border-t-1 border-t-[var(--dark-blue)] h-full  rounded-b-[5px] ">
          <p className="select-none text-[14px] opacity-75">{movie.overview}</p>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;
