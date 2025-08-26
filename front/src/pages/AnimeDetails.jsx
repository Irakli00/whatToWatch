import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getAnimeDetails } from "../services/kistuApi";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Spinner from "../ui/Spinner";

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
      avarageRating,
      ratingFrequencies,
      startDate,
      endDate,
      nextRelease,
      popularityRank,
      ageRating,
      ageRayingGuide,
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
      <img src={coverImage.large} alt={`${titles.en} cover`} />
      <h1>
        {titles.en || titles.en_jp} ||| {canonicalTitle}
      </h1>
      <p>{synopsis}</p>
    </section>
  );
}

export default AnimeDetails;
