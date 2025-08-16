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
  genres,
  language = "en-US",
  region,
  sort = "popularity.desc",
  releaseDate,
  rating,
  runtime,
}) {
  const { min: minRuntime, max: maxRuntime } = runtime;
  const today = new Date().toISOString().split("T")[0];
  const finalGenres = mediaType === "animation" ? [...genres, 16] : genres;
  const baseLang = language.split("-")[0];

  const url = `https://api.themoviedb.org/3/discover/movie?language=${language}&region=${region}&sort_by=${sort}&page=1&${releaseDate ? releaseDate : `primary_release_date.gte=1000&primary_release_date.lte=${today}`}&vote_count.gte=1&vote_average.gte=${rating || 1}&with_genres=${typeof finalGenres === "object" ? finalGenres.join(",") : finalGenres}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}&with_original_language=${baseLang}&with_origin_country=${region}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${KEY}`,
    },
  });

  return res.json();
}

export { getTrending, getRecomendations };

// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/movies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
