import { useContext } from "react";

import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

import { AppContext } from "../../contexts/AppContext.jsx";

import { TMDB_GENRES } from "../../services/tmdbApi.js";
import {
  parseGenres,
  formatDate,
  formatRating,
} from "../../helpers/formaters.js";
import SimpleCard from "./SimpleCard.jsx";

function MovieCard({
  movie,
  height = "270px",
  padding = "10px",
  className,
  cardType = "extended",
}) {
  const genreStrings = parseGenres(movie.genre_ids, TMDB_GENRES);

  const { clientMoviePreferences, setClientMoviePreferences } =
    useContext(AppContext);

  function extendMoviePreferences() {
    movie.genre_ids.includes(16)
      ? setClientMoviePreferences({
          ...clientMoviePreferences,
          mediaType: "animation",
        })
      : setClientMoviePreferences({
          ...clientMoviePreferences,
          mediaType: "movie",
        });
  }

  return (
    <>
      <article
        key={movie.id}
        style={cardType === "extended" ? { height, padding } : {}}
        className={`card card--movie ${className ? className : ""}`}
      >
        {cardType === "extended" ? (
          <>
            <img
              draggable="false"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              // className={` max-w-[${coverImgMaxW}] min-w-${coverImgMinW} h-full  rounded-[7px] select-none `}
            />
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-2xl leading-[0.9] text-balance">
                <strong>{movie.title}</strong>
              </h2>

              <p className="absolute text-center left-8 w-[25px] h-[25px] mix-blend-hard-light bg-amber-50 p-1 text-[14px] rounded-b-lg">
                {new String(movie.original_language).toUpperCase()}
              </p>

              <ul className="flex mt-[4px] flex-wrap gap-1 leading-3 text-[14px]">
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
                <span className="pt-0.5">
                  {formatRating(movie.vote_average)}
                </span>
              </p>

              <div className="overflow-scroll pt-1 border-t border-dark-blue h-full rounded-b-[5px]">
                <p className="select-none text-[14px] opacity-75">
                  {movie.overview}
                </p>
              </div>
            </div>
          </>
        ) : (
          <SimpleCard
            id={movie.id}
            type={"movie"}
            onClick={extendMoviePreferences}
            img={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          ></SimpleCard>
        )}
      </article>
    </>
  );
}

export default MovieCard;
