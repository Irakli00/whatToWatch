import { TMDB_KEY } from "../../.env/i";
// const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

const TMDB_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export { TMDB_GENRES };

async function getTrending() {
  const res = fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return res;
}

async function getMovieRecomendations({
  mediaType,
  genres,
  language = "en-US",
  region,
  sort = "popularity.desc",
  releaseDate,
  rating,
  // runtime,
}) {
  // const { min: minRuntime, max: maxRuntime } = runtime;
  const today = new Date().toISOString().split("T")[0];
  const finalGenres = mediaType === "animation" ? [...genres, 16] : genres;
  const baseLang = language.split("-")[0];

  //no error and null data handling
  const url = `https://api.themoviedb.org/3/discover/movie?language=${language}&region=${region}&sort_by=${sort}&page=1&${releaseDate ? releaseDate : `primary_release_date.gte=1000&primary_release_date.lte=${today}`}&vote_count.gte=1&vote_average.gte=${rating || 1}&with_genres=${typeof finalGenres === "object" ? finalGenres.join(",") : finalGenres}&with_original_language=${baseLang}&with_origin_country=${region}${mediaType !== "animation" ? "&without_genres=16" : ""}`;

  // const url = `https://api.themoviedb.org/3/discover/movie?language=${language}&region=${region}&sort_by=${sort}&page=1&${releaseDate ? releaseDate : `primary_release_date.gte=1000&primary_release_date.lte=${today}`}&vote_count.gte=1&vote_average.gte=${rating || 1}&with_genres=${typeof finalGenres === "object" ? finalGenres.join(",") : finalGenres}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}&with_original_language=${baseLang}&with_origin_country=${region}${mediaType !== "animation" ? "&without_genres=16" : ""}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  });

  return res.json();
}

export { getTrending, getMovieRecomendations };

// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/selectmovies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
