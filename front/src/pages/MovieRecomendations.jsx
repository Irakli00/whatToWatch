import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getMovieRecomendations } from "../services/tmdbApi.js";
import Spinner from "../ui/Spinner.jsx";
import MovieCard from "../ui/MovieCard.jsx";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";

function MovieRecomendations() {
  const { clientMoviePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["movieRecomendations"],
    enabled: !!clientMoviePreferences,
    timeout: 2000,
    retry: 0,
    queryFn: () => getMovieRecomendations(clientMoviePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <main>
      {data ? (
        <ul>
          {data.results.map((el) => (
            <MovieCard key={el.id} movie={el}></MovieCard>
          ))}
        </ul>
      ) : (
        <article>
          <h1>failed to fetch or nothing found idunno</h1>
        </article>
      )}
    </main>
  );
}

export default MovieRecomendations;
