// const KITSU_KEY = import.meta.env.VITE_KISTU_KEY;

async function getAnimeRecomendations({
  mediaType,
  genres,
  releaseDate,
  season,
  status,
  subtype,
}) {
  //season filter is not allowed in manga apparently
  const url = `https://kitsu.io/api/edge/${mediaType || "anime"}?filter[categories]=${genres || ""}&filter[year]=${releaseDate || "2000.."}${mediaType !== "manga" ? `&filter[season]=${season}` : ""}&filter[status]=${status}&filter[subtype]=${subtype || ""}`;

  console.log(url);
  //filter[ageRating]=PG&sort=-averageRating&page[limit]=20&page[offset]=0&fields[anime]=id,canonicalTitle,synopsis,averageRating,startDate,endDate,episodeCount,subtype,status,posterImage&include=categories,mappings,reviews`;

  // https://kitsu.io/api/edge/${mediaType || "anime"}?filter[text]=your-search-term&filter[categories]=action,adventure&filter[year]=2023&filter[season]=spring&filter[streamers]=crunchyroll,funimation&filter[status]=current&filter[subtype]=TV&filter[ageRating]=PG&sort=-averageRating&page[limit]=20&page[offset]=0&fields[anime]=id,canonicalTitle,synopsis,averageRating,startDate,endDate,episodeCount,subtype,status,posterImage&include=categories,mappings,reviews`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/vnd.api+json",
    },
  });

  if (!res.ok) {
    throw new Error(`Kitsu API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
export { getAnimeRecomendations };

async function getAnimeGenres(animeId, mediaType) {
  const url = `https://kitsu.io/api/edge/${mediaType}/${animeId}/relationships/genres`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
}

export { getAnimeGenres };
