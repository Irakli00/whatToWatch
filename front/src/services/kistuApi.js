// const KITSU_KEY = import.meta.env.VITE_KISTU_KEY;

const KITSU_GENRES = {
  1: "Action",
  2: "Adventure",
  3: "Comedy",
  4: "Drama",
  5: "Sci-Fi",
  6: "Space",
  7: "Mystery",
  8: "Magic",
  9: "Supernatural",
  10: "Police",
  11: "Fantasy",
  13: "Sports",
  14: "Romance",
  15: "Cars",
  16: "Slice of Life",
  17: "Racing",
  19: "Horror",
  20: "Psychological",
  21: "Thriller",
  22: "Martial Arts",
  23: "Super Power",
  24: "School",
  25: "Ecchi",
  26: "Vampire",
  27: "Historical",
  28: "Military",
  29: "Dementia",
  30: "Mecha",
  31: "Demons",
  32: "Samurai",
  34: "Harem",
  35: "Music",
  36: "Parody",
  37: "Shoujo Ai",
  38: "Game",
  39: "Shounen Ai",
  40: "Kids",
  41: "Hentai",
  42: "Yuri",
  43: "Yaoi",
  44: "Anime Influenced",
  45: "Gender Bender",
  46: "Doujinshi",
  47: "Mahou Shoujo",
  48: "Mahou Shounen",
  49: "Gore",
  50: "Law",
  51: "Cooking",
  52: "Mature",
  53: "Medical",
  54: "Political",
  55: "Tokusatsu",
  56: "Youth",
  57: "Workplace",
  58: "Crime",
  59: "Zombies",
  60: "Documentary",
  61: "Family",
  62: "Food",
  63: "Friendship",
  64: "Tragedy",
  65: "Isekai",
};

export { KITSU_GENRES };

async function getAnimeRecomendations({
  mediaType,
  genres,
  releaseDate,
  season,
  status,
  subtype,
}) {
  //NOTE:The categories filter in Kitsu is more of a “soft” filter — it tends to prioritize results that include that category, but it may still return manga that don’t have it, especially if they match other filters (year, status, subtype). probably gonna filter on the spot

  //season filter is not allowed in manga apparently
  const url = `https://kitsu.io/api/edge/${mediaType || "anime"}?filter[categories]=${genres || [1, 2]}&filter[year]=${releaseDate || "2000.."}${mediaType !== "manga" ? `&filter[season]=${season || "summer"}` : ""}&filter[status]=${status || "finished"}&filter[subtype]=${!subtype ? (mediaType === "manga" ? "manga" : "TV") : subtype}`;

  //filter[ageRating]=PG&sort=-averageRating&page[limit]=20&page[offset]=0&fields[anime]=id,canonicalTitle,synopsis,averageRating,startDate,endDate,episodeCount,subtype,status,posterImage&include=categories,mappings,reviews`;

  // https://kitsu.io/api/edge/${mediaType || "anime"}?filter[text]=your-search-term&filter[categories]=action,adventure&filter[year]=2023&filter[season]=spring&filter[streamers]=crunchyroll,funimation&filter[status]=current&filter[subtype]=TV&filter[ageRating]=PG&sort=-averageRating&page[limit]=20&page[offset]=0&fields[anime]=id,canonicalTitle,synopsis,averageRating,startDate,endDate,episodeCount,subtype,status,posterImage&include=categories,mappings,reviews`;

  const animeData = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/vnd.api+json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);

  return animeData.data;
}
export { getAnimeRecomendations };

async function getAnimeDetails(mediaType, id) {
  const res = await fetch(`https://kitsu.io/api/edge/${mediaType}/${id}`);

  return await res.json();
}

export { getAnimeDetails };

async function getAnimeGenres(animeId, mediaType) {
  const url = `https://kitsu.io/api/edge/${mediaType}/${animeId}/relationships/genres`;

  const res = await fetch(url);
  const json = await res.json();

  return json.data;
}

export { getAnimeGenres };
