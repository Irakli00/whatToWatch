import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { useContext } from "react";

import { getAnimeDetails } from "../services/kistuApi";
import { AppContext } from "../contexts/AppContext";
import Spinner from "../ui/Spinner";
import { formatRating } from "../helpers/formaters";

function AnimeDetails() {
  const { id } = useParams();
  const { clientAnimePreferences } = useContext(AppContext);

  const { data, isLoading } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnimeDetails(clientAnimePreferences.mediaType, id),
  });

  if (isLoading) return <Spinner></Spinner>;

  const {
    attributes: {
      slug,
      synopsis,
      description,
      titles,
      canonicalTitle,
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
      relationShips,
    },
  } = data.data;

  return (
    <section>
      <div>
        <img
          className="h-full w-full"
          src={coverImage.large}
          alt={`${titles.en} cover`}
        />
      </div>
      <div className="container">
        <article className="flex">
          <img
            className="max-h-96"
            src={posterImage.large}
            alt={`${titles.en} poster`}
          />
          <h1>
            {titles.en || titles.en_jp} ||| {canonicalTitle}
          </h1>

          <article>
            <h3>Synopsis</h3>
            <p>{synopsis}</p>
          </article>
        </article>
        <h3>Details</h3>

        <p>
          <strong>Average Rating:</strong> {formatRating(averageRating)}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate}
        </p>
        <p>
          <strong>End Date:</strong> {endDate || "Ongoing"}
        </p>
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

        <h3>Titles</h3>
        <p>
          <strong>English:</strong> {titles.en}
        </p>
        <p>
          <strong>English (JP):</strong> {titles.en_jp}
        </p>
        <p>
          <strong>Japanese:</strong> {titles.ja_jp}
        </p>

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
  );
}

export default AnimeDetails;
