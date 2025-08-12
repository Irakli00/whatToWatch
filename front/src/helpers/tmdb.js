function parseGenres(genres) {
  const TMDB_GENRES = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    1051: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    1002: "Music",
    968: "Mystery",
    1049: "Romance",
    87: "Science Fiction",
    1070: "TV Movie",
    53: "Thriller",
    1052: "War",
    37: "Western",
  };

  return genres.map((genreId) => TMDB_GENRES[genreId]);
}

export { parseGenres };
