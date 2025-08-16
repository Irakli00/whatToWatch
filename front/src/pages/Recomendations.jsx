import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getRecomendations } from "../services/tmdbApi";
import Spinner from "../ui/Spinner";
import MediaCard from "../ui/MediaCard";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function Recomendations() {
  const { clientMoviePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["recomendations"],
    enabled: !!clientMoviePreferences,
    timeout: 2000,
    retry: 0,
    queryFn: () => getRecomendations(clientMoviePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <main>
      {data ? (
        <ul>
          {data.results.map((el) => (
            <MediaCard key={el.id} movie={el}></MediaCard>
          ))}
        </ul>
      ) : (
        <article>
          {/* default behavior */}
          <h1>failed to fetch or nothing found idunno</h1>
        </article>
      )}
    </main>
  );
}

export default Recomendations;
