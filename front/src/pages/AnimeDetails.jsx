import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";

import DOMPurify from "dompurify";

import Page from "../ui/layout/Page";

import { AppContext } from "../contexts/AppContext";

import { getAnime, getSimilarAnimes } from "../services/aliListApi";

import { formatDate, formatRating } from "../helpers/formaters";
import GenreLink from "../ui/elements/GenreLink";
import MediaHeader from "../ui/elements/MediaHeader";
import CoverImage from "../ui/elements/CoverImg";
import Carousel from "../ui/elements/Carousel";
import Spinner from "../ui/primitives/Spinner";

function AnimeDetails() {
  const { clientAnimePreferences } = useContext(AppContext);

  const { id } = useParams();

  const {
    data: similarAnimes,
    isLoading: similarLoading,
    isFetched: similarFetched,
  } = useQuery({
    queryKey: ["similarAnimes", id],
    queryFn: () => getSimilarAnimes(id),
  });

  const clientQuery = useQueryClient();

  const cachedAnime = clientQuery
    .getQueryData(["animeRecomendations", clientAnimePreferences])
    ?.find((anime) => anime.id == id);
  // || JSON.parse(localStorage.getItem(id));

  const { data, isLoading: y } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnime(id),
    enabled: !cachedAnime,
    initialData: cachedAnime,
  });

  if (y) return <Spinner></Spinner>;

  if (!data) return;

  const {
    type,
    status,
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
  } = data;

  // if (isFetched) console.log(similarAnimes);

  return (
    <Page bgColor={coverImage.color} className="bg-white-red-tint">
      <section>
        {bannerImage && (
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
                <CoverImage
                  src={coverImage.extraLarge}
                  alt={`${title.en} poster`}
                ></CoverImage>
                <article className="flex flex-col gap-7">
                  <MediaHeader
                    title={title?.english}
                    originalTitle={title.native}
                    rating={averageScore / 10}
                  ></MediaHeader>

                  <ul className="flex gap-2">
                    {genres.map((genre) => (
                      <GenreLink type="anime" genre={genre}></GenreLink>
                    ))}
                  </ul>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(description),
                    }}
                    className="w-[75%] leading-6 text-balance"
                  >
                    {/* {description} */}
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
                  {formatDate(
                    `${startDate?.year}-${startDate?.month}-${startDate?.day}`
                  )}
                </p>
                {status === "FINISHED" && (
                  <p>
                    <strong>End Date:</strong>
                    {formatDate(
                      `${endDate?.year}- ${endDate?.month}-${endDate?.day}`
                    )}
                  </p>
                )}
              </div>
            </article>
          </div>
        </div>
        <aside className="container  mx-auto pt-2 min-h-[340px]">
          {similarLoading && <Spinner></Spinner>}
          {similarFetched && (
            <Carousel
              slidesPerView={7}
              type="anime"
              data={similarAnimes.map((an) => an.mediaRecommendation)}
              isLoading={similarLoading}
            />
          )}
          {/* {isFetched &&
            similarAnimes
              .map((an) => an.mediaRecommendation)
              .map((anime) => <AnimeCard anime={anime}></AnimeCard>)} */}
        </aside>
      </section>
    </Page>
  );
}

export default AnimeDetails;
