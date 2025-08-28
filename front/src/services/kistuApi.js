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
  sort,
}) {
  // filter[ageRating] = PG;
  const params = new URLSearchParams();

  if (genres) params.append("filter[categories]", genres);
  if (releaseDate) params.append("filter[year]", releaseDate);
  if (season && mediaType === "anime") params.append("filter[season]", season);
  if (status) params.append("filter[status]", status);
  if (subtype) params.append("filter[subtype]", subtype);
  if (sort) params.append("sort", sort);

  //NOTE:The categories filter in Kitsu is more of a “soft” filter — it tends to prioritize results that include that category, but it may still return manga that don’t have it, especially if they match other filters (year, status, subtype). probably gonna filter on the spot

  // const url = `https://kitsu.io/api/edge/${mediaType}?filter[categories]=${genres}&filter[year]=${releaseDate}${season ? `&filter[season]=${season}` : ""}&filter[status]=${status}&filter[subtype]=${subtype}`;
  const url = `https://kitsu.io/api/edge/${mediaType}?${params}&include=genres`;

  //&&fields[anime]=id,canonicalTitle,synopsis,averageRating,startDate,endDate,episodeCount,subtype,status,posterImage&include=categories,mappings,reviews`;

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

// 1. JSON:API Query Parameters

// While these are not specific "filters" by attribute, they control what and how data is fetched:

// fields[anime]=… – Sparse fieldsets: request only specific attributes or relationships in the response
// include=… – Includes related resources: e.g. characters, staff.person, etc. Multiple can be specified with comma-separated or nested dot syntax
// page[limit]=… and page[offset]=… – Pagination controls for limiting and offsetting results
// sort=… – Sorting: specify one or more attributes to sort by (prefix with - for descending)

// 2. Resource-Specific Filters (filter[...])

// The filter[...] parameter accepts certain attributes specific to anime. Supported ones include:
// filter[id] – Filter by anime ID
// filter[text] – Full-text search (e.g., title, characters, cast)
// filter[season] – Filter by release season (e.g. winter, spring)
// filter[seasonYear] – Filter by release year
// filter[ageRating] – Filter by age rating(s) like R, PG, etc. (available via client libraries like kitsu.py)
// filter[categories] – Filter by category tags such as action, fantasy, etc.
// filter[after_year] / filter[before_year] – Bound release years (as available in kitsu.py)

// Other filters commonly used include:

// filter[subtype] – e.g., tv, movie, special, ova (widely used though not directly cited above).
// filter[status] – e.g., current, finished, upcoming, tba (also widely used in examples).

// --------redundant now--------
// async function getAnimeDetails(mediaType, id) {
//   const res = await fetch(
//     `https://kitsu.io/api/edge/${mediaType}/${id}?include=genres`
//   );

//   return await res.json();
// }
// export { getAnimeDetails };

// async function getAnimeGenres(animeId, mediaType) {
//   const url = `https://kitsu.io/api/edge/${mediaType}/${animeId}/relationships/genres`;

//   const res = await fetch(url);
//   const json = await res.json();

//   return json.data;
// }
// export { getAnimeGenres };
