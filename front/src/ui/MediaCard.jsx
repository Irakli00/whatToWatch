function MediaCard({ movie }) {
  return (
    <article>
      <h1>{movie.title}</h1>
      <p>{movie.genre}</p>
      <p>{movie.rating}</p>
      <p>{movie.year}</p>
      <img src={movie.image} alt={movie.title} />
    </article>
  );
}

export default MediaCard;
