import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import { getMovie } from "../services/tmdbApi";
import Spinner from "../ui/Spinner";
import Page from "../ui/Page";
import { formatRating } from "../helpers/formaters";

function MovieDetails() {
  const { id: movieId } = useParams();

  // console.log()

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(movieId),
  });

  if (isLoading) return <Spinner></Spinner>;

  const {
    backdrop_path: backdropUrl,
    budget,
    genres,
    homepage: homepageUrl,
    origin_country: orogonCountry,
    original_language: originalLang,
    original_title: originalTitle,
    title,
    release_date: releaseDate,
    overview,
    // popularity,
    poster_path: posterUrl,
    production_companies: productions,
    revenue,
    tagline,
    vote_average: rating,
    vote_count: votesNum,
  } = movie;

  return (
    <Page className=" bg-white-yellow-tint">
      <section>
        <div className="container">
          <article className="mt-12">
            <div className="flex gap-3.5">
              <div>
                <img
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w500/${posterUrl}`}
                  alt={title}
                />
              </div>
              <article className="flex flex-col gap-7">
                <h1>{title}</h1>
                {/* <p className="w-[75%] leading-6">{synopsis}</p> */}
                <ul className="flex gap-2">
                  <li>GENRES HERE</li>
                </ul>
                <p className="w-[75%] leading-6 text-balance">{overview}</p>
              </article>
            </div>
          </article>
          <article className="flex">
            <div>
              <p>
                <strong>Average Rating:</strong> {formatRating(rating)}
              </p>
            </div>
          </article>
        </div>
      </section>
    </Page>
  );
}

export default MovieDetails;
