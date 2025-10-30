// import { TMDB_KEY } from "../../.env/i";
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;

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

async function getTrendingMovies() {
  const responses = await Promise.all([
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=1",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_KEY}`,
        },
      }
    ),
    fetch(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=2",
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${TMDB_KEY}`,
        },
      }
    ),
  ]);

  const trendingMovies = await Promise.all(responses.map((r) => r.json()));

  return trendingMovies.flatMap((el) => el.results);
}

async function getMovieRecomendations({
  mediaType,
  genres,
  language,
  region,
  sort,
  releaseDate,
  rating,
  page,
  certification,
}) {
  const params = new URLSearchParams();
  //api.themoviedb.org/3/discover/movie?api_key=YOUR_API_KEY&language=en-US&region=US&sort_by=popularity.desc&certification_country=US&certification=PG-13&certification.lte=R&include_adult=false&include_video=false&page=1&primary_release_year=2023&primary_release_date.gte=2023-01-01&primary_release_date.lte=2023-12-31&release_date.gte=2023-01-01&release_date.lte=2023-12-31&with_release_type=3&year=2023&vote_count.gte=100&vote_count.lte=10000&vote_average.gte=7.0&vote_average.lte=10.0&with_cast=500,6193&with_crew=525&with_people=1&with_companies=1,2&with_genres=28,12&without_genres=27,53&with_keywords=1721,9715&without_keywords=210024&with_runtime.gte=90&with_runtime.lte=180&with_original_language=en&with_watch_providers=8,9&watch_region=US&with_watch_monetization_types=flatrate

  // &primary_release_year=2023

  // &with_runtime.gte=90&with_runtime.lte=180

  if (genres) params.append("with_genres", genres);
  if (language) params.append("language", language);
  if (mediaType === "animation") {
    params.append("with_genres", [...genres, 16]);
  } else if (mediaType === "movie") {
    params.append("without_genres", 16);
  }
  if (region) params.append("region", region);
  if (sort) params.append("sort_by", sort);
  if (page) params.append("page", page);
  // if (releaseDate) params.append("primary_release_date.gte", releaseDate);
  // if (rating) params.append("vote_avarage.gte", rating);
  if (language) params.append("with_original_language", language.split("-")[0]);

  // &include_adult=false
  //no error and null data handling
  const url = `https://api.themoviedb.org/3/discover/movie?${params}${
    rating ? `&${rating}` : ""
  }${releaseDate ? `&${releaseDate}` : ""}${
    certification ? `&${certification}` : ""
  }&vote_count.gte=10`; //just because
  // console.log(url);

  const movieRecomendations = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  })
    .then((res) => res.json())
    .then((data) => data.results);

  return movieRecomendations;
}

async function getMovie(movieId) {
  // https://api.themoviedb.org/3/movie/1136867/videos  event this not bad
  const responses = await Promise.all([
    fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }),
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_KEY}`,
      },
    }),
  ]);

  const movie = await Promise.all(responses.map((r) => r.json()));

  return movie;
}

export { getTrendingMovies, getMovieRecomendations, getMovie };

// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/selectMovies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
