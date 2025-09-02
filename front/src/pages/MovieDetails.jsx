import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { GoStar } from "react-icons/go";
import { useContext } from "react";

import { getMovie } from "../services/tmdbApi";
import Spinner from "../ui/primitives/Spinner";
import Page from "../ui/layout/Page";
import { formatBudget, formatDate, formatRating } from "../helpers/formaters";
import { AppContext } from "../contexts/AppContext";
import Carousel from "../ui/elements/Carousel";

function MovieDetails() {
  const { id: movieId } = useParams();

  const navigate = useNavigate();
  const { clientMoviePreferences, setClientMoviePreferences } =
    useContext(AppContext);

  const { data, isLoading } = useQuery({
    queryKey: ["movie", movieId],
    staleTime: 60 * 1000,
    queryFn: () => getMovie(movieId),
  });

  if (isLoading) return <Spinner></Spinner>;

  const [movie, { cast, crew }, { results: similarMovies }] = data;

  // console.log(cast[0], crew[0]);
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
    // belongs_to_collection: colection,
    poster_path: posterUrl,
    production_companies: productions,
    revenue,
    runtime,
    tagline,
    vote_average: rating,
    vote_count: votesNum,
  } = movie;

  return (
    <Page className=" bg-white-yellow-tint">
      <section>
        <div className="cusom-container">
          <article className="mt-12">
            <div className="flex gap-3.5">
              <div className="">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${posterUrl}`}
                  alt={title}
                  // width="500px"
                  className="max-w-[300px] rounded-xl"
                />
              </div>

              <article className="flex flex-col ">
                <div className="flex justify-between items-center">
                  <div className="max-w-[70%]">
                    <h1 className="text-5xl text-balance ">
                      {title}
                      {title !== originalTitle && (
                        <span className="text-2xl ">
                          <br />({originalTitle})
                        </span>
                      )}
                    </h1>
                    <p className="mt-1.5 opacity-60 text-pretty">
                      <i>{tagline}</i>
                    </p>
                  </div>
                  <div>
                    <p className="flex text-2xl items-center justify-end gap-1">
                      <GoStar></GoStar>
                      {formatRating(rating)}
                    </p>
                    <p>
                      <i>{votesNum} votes</i>
                    </p>
                  </div>
                </div>

                {/* <p className="w-[75%] leading-6">{}</p> */}
                <ul className="flex items-center gap-3 mt-3">
                  {genres.map((g) => (
                    <li key={g.id}>
                      <button
                        className="py-1 px-2 rounded-sm border-1 font-bold text-dark-blue transition-all duration-00 ease-in hover:bg-bright-yellow"
                        onClick={() => {
                          setClientMoviePreferences({
                            ...clientMoviePreferences,
                            genres: [g.id],
                          });

                          navigate("/recomendations/movies");
                        }}
                      >
                        {g.name}
                      </button>
                      {/* gonna redirect to each genre
                      (setGenre in prefferences) */}
                    </li>
                  ))}
                </ul>
                <p className="mt-4  p-4.5 leading-6 text-balance bg-amber-100  h-full rounded-2xl">
                  {overview}
                </p>
              </article>
            </div>
          </article>

          <article className="flex flex-col">
            <p>Released at {formatDate(releaseDate)}</p>
            <p>runtime:{runtime} min</p>
            <p>budget:{formatBudget(budget)}</p>
            <p>revenue:{formatBudget(revenue)}</p>

            {homepageUrl && (
              <a target="_blank" href={homepageUrl}>
                More Here
              </a>
            )}
          </article>
        </div>

        <ul className="container mx-auto flex items-center justify-around bg-yellow-200 mask-x-from-95% p-5">
          {cast.slice(0, 5).map((p) => (
            <li key={p.name} className=" flex gap-1 items-center">
              <img
                className=" max-w-[120px]  rounded-[50%] aspect-[1/1]"
                draggable={false}
                // const [notLoaded, setNotLoaded] = useState();
                // onError={() => setNotLoaded(true)} //if not loaded display something else
                src={`https://image.tmdb.org/t/p/w300/${p.profile_path}`}
              />
              <figcaption className="text-center">
                <span className="font-bold">{p.name}</span>
                <br />
                <span>{p.character}</span>
              </figcaption>
            </li>
          ))}
        </ul>

        {similarMovies.length && <Carousel data={similarMovies}></Carousel>}

        {/* <ul className="flex items-center justify-around bg-yellow-200">
          {productions.map((p) => (
            <li key={p.name} className="p-2">
              <img
                width={"130px"}
                height={"100px"}
                draggable={false}
                src={`https://image.tmdb.org/t/p/w300/${p.logo_path}`}
                alt={p.name}
              />
            </li>
          ))}
        </ul> */}
      </section>
    </Page>
  );
}
{
  /* <img
                  draggable={false}
                  className="blur-xs absolute top-0 left-0"
                  src={`https://image.tmdb.org/t/p/w500/${backdropUrl}`}
                  alt={title}
                /> */
}
{
  /* <img
                  draggable={false}
                  src={`https://image.tmdb.org/t/p/w500//ivMGO3rmLRYgNaY5Yw0cwkeS07O.jpg`}
                  alt={title}
                /> */
}
export default MovieDetails;
