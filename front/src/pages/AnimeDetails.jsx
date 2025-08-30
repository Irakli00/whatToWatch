import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import { KITSU_GENRES } from "../services/kistuApi";
// import Spinner from "../ui/Spinner";
import { formatDate, formatRating, parseGenres } from "../helpers/formaters";
import Page from "../ui/Page";

import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function AnimeDetails() {
  const { clientAnimePreferences } = useContext(AppContext);

  const { id } = useParams();

  const clientQuery = useQueryClient();

  const anime =
    clientQuery
      .getQueryData(["animeRecomendations", clientAnimePreferences])
      ?.find((anime) => anime.id === id) ||
    JSON.parse(localStorage.getItem(id));

  // if (isLoading) return <Spinner></Spinner>;

  const {
    attributes: {
      // slug,
      // synopsis,
      description,
      titles,
      // canonicalTitle,
      averageRating,
      ratingFrequencies,
      startDate,
      endDate,
      nextRelease,
      popularityRank,
      ageRating,
      ageRatingGuide,
      subtype,
      status,
      posterImage,
      coverImage,
      episodeCount,
      episodeLength,
      showType,
    },
    relationships: { genres },
  } = anime;

  const gerneIds = genres.data.map((g) => g.id);

  return (
    <Page className=" bg-white-red-tint">
      <section>
        {coverImage?.large && (
          <div>
            {/* <div className="h-[240px] overflow-clip bg-dark-blue"> */}
            <img
              draggable={false}
              className="w-full h-full mask-x-from-91% "
              src={coverImage.large}
              alt={``} //often covers are not there alt just makes them invisible
            />
          </div>
        )}
        <div className="container">
          <article className="mt-12">
            <div className="flex gap-3.5">
              <img
                className="max-h-96 rounded-md"
                src={posterImage.large}
                alt={`${titles.en} poster`}
              />
              <article className="flex flex-col gap-7">
                <h1 className="w-fit text-5xl text-balance flex gap-2 group">
                  {titles.en || titles.en_jp}
                  <span className="opacity-1  ease-in duration-75 group-hover:opacity-100">
                    <i>({titles.ja_jp})</i>
                  </span>
                </h1>
                {/* <p className="w-[75%] leading-6">{synopsis}</p> */}
                <ul className="flex gap-2">
                  {parseGenres(
                    gerneIds.length ? gerneIds : clientAnimePreferences.genres,
                    KITSU_GENRES
                  ).map((genre) => (
                    <li key={genre}>
                      <i>{genre}</i>
                    </li>
                  ))}
                </ul>
                <p className="w-[75%] leading-6 text-balance">{description}</p>
              </article>
            </div>
          </article>
          <article className="flex">
            <div>
              <p>
                <strong>Average Rating:</strong>{" "}
                {formatRating(averageRating / 10)}
              </p>
              <p>
                <strong>Popularity Rank:</strong> {popularityRank}
              </p>

              <p>
                <strong>Subtype:</strong> {subtype}
              </p>
              <p>
                <strong>Show Type:</strong> {showType}
              </p>

              <p>
                <strong>Age Rating:</strong> {ageRating}
              </p>
              <p>
                <strong>Age Rating Guide:</strong> {ageRatingGuide}
              </p>
            </div>

            <div>
              <p>
                <strong>Status:</strong> {status}
              </p>
              <p>
                <strong>Start Date:</strong> {formatDate(startDate)}
              </p>
              {status !== "current" && (
                <p>
                  <strong>End Date:</strong> {formatDate(endDate)}
                </p>
              )}
              {status === "current" ||
                (nextRelease && (
                  <p>
                    <strong>Next Release:</strong> {nextRelease || "N/A"}
                  </p>
                ))}
              <p>
                <strong>Episode Count:</strong> {episodeCount}
              </p>
              <p>
                <strong>Episode Length:</strong> {episodeLength} minutes
              </p>
            </div>

            <div>
              {Object.entries(ratingFrequencies).map(([rating, count]) => (
                <p key={rating}>
                  <strong>{rating / 2} stars:</strong> {count} votes
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
}

export default AnimeDetails;
