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

  const anime = clientQuery
    .getQueryData(["animeRecomendations", clientAnimePreferences])
    ?.find((anime) => anime.id === id);

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
    <Page>
      <main className="overflow-hidden bg-white-red-tint ">
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
                  <h1 className="text-5xl text-balance">
                    {titles.en || titles.en_jp}
                    {/* ({titles.ja_jp}) */}
                  </h1>
                  {/* <p className="w-[75%] leading-6">{synopsis}</p> */}
                  <ul>
                    {parseGenres(gerneIds, KITSU_GENRES).map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                  <p className="w-[75%] leading-6 text-balance">
                    {description}
                  </p>
                </article>
              </div>
            </article>
            <h3>Details</h3>

            <p>
              <strong>Average Rating:</strong>{" "}
              {formatRating(averageRating / 10)}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDate(startDate)}
            </p>
            {!status === "current" && (
              <p>
                <strong>End Date:</strong> {endDate || "Ongoing"}
              </p>
            )}
            <p>
              <strong>Next Release:</strong> {nextRelease || "N/A"}
            </p>
            <p>
              <strong>Popularity Rank:</strong> {popularityRank}
            </p>
            <p>
              <strong>Age Rating:</strong> {ageRating}
            </p>
            <p>
              <strong>Age Rating Guide:</strong> {ageRatingGuide}
            </p>
            <p>
              <strong>Subtype:</strong> {subtype}
            </p>
            <p>
              <strong>Status:</strong> {status}
            </p>
            <p>
              <strong>Episode Count:</strong> {episodeCount}
            </p>
            <p>
              <strong>Episode Length:</strong> {episodeLength} minutes
            </p>
            <p>
              <strong>Show Type:</strong> {showType}
            </p>
            {/* 
        <h3>Titles</h3>
        <p>
          <strong>English:</strong> {titles.en}
        </p>
        <p>
          <strong>English (JP):</strong> {titles.en_jp}
        </p>
        <p>
          <strong>Japanese:</strong> {titles.ja_jp}
        </p> */}

            <h3>Rating Frequencies</h3>
            <div>
              {Object.entries(ratingFrequencies).map(([rating, count]) => (
                <p key={rating}>
                  <strong>{rating / 2} stars:</strong> {count} votes
                </p>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Page>
  );
}

export default AnimeDetails;
