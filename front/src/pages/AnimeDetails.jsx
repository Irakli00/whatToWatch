import { useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router";

import DOMPurify from "dompurify";

import Page from "../ui/layout/Page";

import { AppContext } from "../contexts/AppContext";

import { getAnime, getSimilarAnimes } from "../services/aliListApi";

import {
  formatDate,
  formatPopularityNumber,
  formatRating,
} from "../helpers/formaters";

import { GoStar } from "react-icons/go";
import { FaRegHeart } from "react-icons/fa";

import GenreLink from "../ui/elements/GenreLink";
import MediaHeader from "../ui/elements/MediaHeader";
import CoverImage from "../ui/elements/CoverImg";
import Carousel from "../ui/elements/Carousel";
import Spinner from "../ui/primitives/Spinner";
import ParticularInfo from "../ui/elements/ParticularInfo";

function AnimeDetails() {
  // source;
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

  const { data, isLoading: animeLoading } = useQuery({
    queryKey: ["anime", id],
    queryFn: () => getAnime(id),
    enabled: !cachedAnime,
    initialData: cachedAnime,
  });

  if (animeLoading) return <Spinner></Spinner>;

  if (!data) return; //gonna make proper error latter

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
    externalLinks,
    relations: { edges: relatedMedia },
  } = data;

  const adaptation = relatedMedia.filter(
    (r) => r.relationType === "ADAPTATION"
  )[0];

  const streamingLinks = externalLinks.filter((el) => el.type === "STREAMING");
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
        <div className="bg-transparent-gray">
          <div className="cusom-container">
            <article className="mt-12">
              <div className="flex max-h-[450px]  gap-3.5">
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
                    className="w-full leading-6 overflow-scroll text-balance"
                  ></p>
                </article>
              </div>
            </article>
            <article className="mt-2 mb-5.5 flex flex-col justify-between">
              <div className="flex justify-between">
                <ParticularInfo borderColor={coverImage.color}>
                  <p className="flex gap-1 items-center">
                    {formatRating(averageScore / 10)}
                    <GoStar></GoStar>
                  </p>
                  <p className="flex gap-1 items-center">
                    {formatPopularityNumber(favourites)}
                    <FaRegHeart></FaRegHeart>
                  </p>
                </ParticularInfo>
                <ParticularInfo>
                  <p>
                    {source === "ORIGINAL"
                      ? `${type.toLowerCase()} is the source of`
                      : `${type.toLowerCase()} adaptation of`}{" "}
                    <Link
                      className="underline"
                      target="_blank"
                      to={`/anime/${adaptation.node.id}`}
                    >
                      {adaptation.node.title.english}
                    </Link>
                  </p>
                </ParticularInfo>

                {episodes && (
                  <ParticularInfo>
                    <p>
                      {episodes} episodes <i>({duration}min each)</i>
                    </p>
                  </ParticularInfo>
                )}
                <ParticularInfo>
                  <p>
                    {type === "ANIME" ? "Aired:" : "Released:"}
                    {formatDate(
                      `${startDate?.year}-${startDate?.month}-${startDate?.day}`
                    )}{" "}
                    {status === "FINISHED" && (
                      <span>
                        -{" "}
                        {formatDate(
                          `${endDate?.year}- ${endDate?.month}-${endDate?.day}`
                        )}
                      </span>
                    )}
                  </p>
                </ParticularInfo>
              </div>

              {trailer && (
                <div className="mt-5 flex justify-center">
                  <a
                    style={{ backgroundColor: coverImage.color }}
                    href={`https://www.youtube.com/watch?v=${trailer?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-radial px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300  hover:shadow-xl"
                  >
                    <span className="relative z-10">Watch Trailer</span>
                    <span
                      className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                    ></span>
                  </a>
                </div>
              )}
            </article>

            <article>
              <h3>You can Watch Here:</h3>
              <ul>
                {streamingLinks.map((link) => (
                  <li>
                    <a target="_blank" href={link.url}>
                      {link.site}
                    </a>
                  </li>
                ))}
              </ul>
            </article>

            <article>
              <p>-------------</p>
              <h3>Related Media</h3>
              <ul>
                {relatedMedia.map((media) => (
                  <li>
                    {media.node.type}-
                    {media.node.title.english ?? media.node.title.romaji}:
                    {media.relationType}
                  </li>
                ))}
                {/* + each's id */}
              </ul>
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
{
  /* <p>
<strong>Age Rating:</strong> {ageRating}
</p> */
}
{
  /* <p>
<strong>Age Rating Guide:</strong> {ageRatingGuide}
</p> */
}
