import { KEY } from "./.tmdbKey";

async function getTrending() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${KEY}`,
    },
  };

  const res = fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return res;
}
async function getRecomendations({
  mediaType,
  genres = "",
  language = "en-US",
  region = "",
  sort = "popularity.desc",
  releaseDateFrom = "",
  releaseDateTo = "",
  rating = "",
  minRuntime = "",
  maxRuntime = "",
  originLang = "",
  originCountry = "",
}) {
  console.log(mediaType);
  const params = new URLSearchParams({
    language,
    region,
    sort_by: sort,
    page: 1,
    include_adult: false,
    include_video: false,
    with_genres: "",
  });

  if (releaseDateFrom)
    params.append("primary_release_date.gte", releaseDateFrom);
  if (releaseDateTo) params.append("primary_release_date.lte", releaseDateTo);
  if (rating) params.append("vote_average.gte", rating);
  if (genres) params.append("with_genres", genres);
  if (mediaType === "animation") params.append("with_genres", 16); //edge case
  // if (!genres && mediaType === "animation")
  //   params.append("with_genres", [...genres, 16]); //edge case
  if (minRuntime) params.append("with_runtime.gte", minRuntime);
  if (maxRuntime) params.append("with_runtime.lte", maxRuntime);
  if (originLang) params.append("with_original_language", originLang);
  if (originCountry) params.append("with_origin_country", originCountry);

  console.log(params);

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?${params}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${KEY}`,
      },
    }
  );

  return res.json();
}

// 'https://api.themoviedb.org/3/discover/movie?language=en-US&region=US&sort_by=popularity.desc&page=1&include_adult=false&include_video=false&primary_release_date.gte=2020-01-01&primary_release_date.lte=2025-12-31&with_release_type=3|4&vote_count.gte=500&vote_average.gte=6.5&with_genres=28,878&without_genres=35&with_runtime.gte=80&with_runtime.lte=180&with_original_language=en&with_origin_country=US&with_watch_providers=8|9&watch_region=US&with_watch_monetization_types=flatrate|rent
// '
export { getTrending, getRecomendations };

// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/movies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
