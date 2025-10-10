import { IoCalendarClearOutline } from "react-icons/io5";
import { FaRegStar } from "react-icons/fa";

import DOMPurify from "dompurify";

import { formatRating } from "../../helpers/formaters";
import { Link } from "react-router";

function AnimeCard({
  anime,
  height = "100%",
  padding = "10px",
  cardType = "extended",
}) {
  const { type, coverImage, genres, title, averageScore, description } = anime;

  const largeImg = coverImage?.large || "imagenotfound";

  return (
    <article style={{ height, padding }} className="card card--anime">
      {cardType === "extended" ? (
        <>
          <div className="h-full">
            <img
              draggable="false"
              src={largeImg}
              alt={title?.english}
              className="max-w-[180px] h-full rounded-[7px]"
            />
          </div>

          <div className="flex flex-col gap-[7px]">
            <h2 className="text-2xl leading-[0.9]">
              <strong>{title?.english || title?.romanji}</strong>
            </h2>

            <h1>{type?.toUpperCase()}</h1>

            <ul className="flex flex-wrap gap-1 leading-3">
              {genres?.map((g, i) => (
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
              <span className="pt-0.5">{formatRating(averageScore / 10)}</span>
            </p>

            <div className="overflow-scroll pt-1 border-t border-dark-blue h-full rounded-b-[5px]">
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
                className="select-none text-[14px] opacity-75"
              >
                {/* {description} */}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Link key={anime.id} to={`/anime/${anime.id}`} relative="path">
          <img
            draggable="false"
            src={largeImg}
            className={`h-[280px] rounded-[7px] select-none `}
            // alt={movie.title}
          />
        </Link>
      )}
    </article>
  );
}

export default AnimeCard;
