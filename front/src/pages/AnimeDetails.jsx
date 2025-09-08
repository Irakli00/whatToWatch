import { useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import Page from "../ui/layout/Page";

import { AppContext } from "../contexts/AppContext";

import { formatDate, formatRating } from "../helpers/formaters";

function AnimeDetails() {
  const { clientAnimePreferences } = useContext(AppContext);

  const { id } = useParams();

  const clientQuery = useQueryClient();

  const anime =
    clientQuery
      .getQueryData(["animeRecomendations", clientAnimePreferences])
      .find((anime) => anime.id === id) || JSON.parse(localStorage.getItem(id));

  const {
    type,
    status,
    popularity,
    coverImage,
    bannerImage,
    genres,
    title,
    averageScore,
    description,
    startDate,
    endDate,
    episodes,
    duration,
    source,
    trailer,
    favourites,
    studios,
    characters,
    staff,
  } = anime;

  // if (isLoading) return <Spinner></Spinner>;

  return (
    <Page bgColor={coverImage.color} className="bg-white-red-tint">
      <section>
        {coverImage?.medium && (
          <div
            className="h-[300px] w-full mask-x-from-40% bg-center"
            style={{
              backgroundColor: coverImage.color,
              backgroundImage: `url(${bannerImage})`,
            }}
          ></div>
        )}
        <div className="bg-[#ffffff75]">
          <div className="cusom-container">
            <article className="mt-12">
              <div className="flex gap-3.5">
                <img
                  className="max-h-96 rounded-md"
                  src={coverImage.large}
                  alt={`${title.en} poster`}
                />
                <article className="flex flex-col gap-7">
                  <h1 className="w-fit text-5xl text-balance flex gap-2 group">
                    {title.english || title.romanji}
                    <span className="opacity-1  ease-in duration-75 group-hover:opacity-100">
                      <i>({title.native})</i>
                    </span>
                  </h1>
                  {/* <p className="w-[75%] leading-6">{synopsis}</p> */}
                  <ul className="flex gap-2">
                    {genres.map((genre) => (
                      <li key={genre}>
                        <i>{genre}</i>
                      </li>
                    ))}
                  </ul>
                  <p className="w-[75%] leading-6 text-balance">
                    {description}
                  </p>
                </article>
              </div>
            </article>
            <article className="flex">
              <div>
                <p className="mix-blend-multiply">
                  <strong>Average Rating:</strong>{" "}
                  {formatRating(averageScore / 10)}
                  favorite by ({favourites})
                </p>
                <p>
                  <strong>Popularity Rank:</strong> {popularity}
                </p>

                <p>
                  <strong>Subtype:</strong> {type}, original source: {source}
                </p>

                <p>
                  {episodes} episodes, {duration}min
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${trailer?.id}`}
                  target="_blank"
                >
                  TRAILER
                </a>

                {/* <p>
                <strong>Age Rating:</strong> {ageRating}
              </p> */}
                {/* <p>
                <strong>Age Rating Guide:</strong> {ageRatingGuide}
              </p> */}
              </div>

              <div>
                <p>
                  <strong>Status:</strong> {status}
                </p>
                <p>
                  <strong>Start Date:</strong>
                  {`${startDate.day} ${startDate.month},${startDate.year}`}
                </p>
                {status === "FINISHED" && (
                  <p>
                    <strong>End Date:</strong>{" "}
                    {`${endDate.day} ${endDate.month},${endDate.year}`}
                  </p>
                )}

                {/* <p>
                <strong>Episode Count:</strong> {episodeCount}
              </p>
              <p>
                <strong>Episode Length:</strong> {episodeLength} minutes
              </p> */}
              </div>
            </article>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default AnimeDetails;
