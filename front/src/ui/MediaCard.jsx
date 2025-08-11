function MediaCard({ movie }) {
  return (
    <article>
      <h1>{movie.title}</h1>
      {/* <p>{movie.overview}</p> */}
      <p>{movie.release_date}</p>
      <p>{movie.vote_average}</p>
      <p>{movie.vote_count}</p>
      {/* <img src={movie.poster_path} alt={movie.title} /> */}
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
      />
    </article>
  );
}

export default MediaCard;
