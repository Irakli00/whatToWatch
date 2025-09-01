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
}) {
  const params = new URLSearchParams();

  // console.log(genres, genres.includes("16"), mediaType);

  if (genres) params.append("with_genres", genres);
  if (language) params.append("language", language);
  if (mediaType === "animation") {
    params.append("with_genres", [...genres, 16]);
  } else if (mediaType === "movie") {
    params.append("without_genres", 16);
  }
  if (region) params.append("region", region);
  if (sort) params.append("sort", sort);
  if (page) params.append("page", page);
  // if (releaseDate) params.append("primary_release_date.gte", releaseDate);
  // if (rating) params.append("vote_avarage.gte", rating);
  if (language) params.append("with_original_langiage", language.split("-")[0]);

  //no error and null data handling
  const url = `https://api.themoviedb.org/3/discover/movie?${params}&vote_average.gte=${rating}&${releaseDate}`; //just because
  // console.log(params);

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
  const url = `https://api.themoviedb.org/3/movie/${movieId}`;
  const movie = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_KEY}`,
    },
  }).then((res) => res.json());

  return movie;
}

export { getTrending, getMovieRecomendations, getMovie };

// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/selectMovies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
