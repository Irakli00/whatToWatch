import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getAnimeRecomendations } from "../services/kistuApi.js";
import Spinner from "../ui/Spinner.jsx";
import MovieCard from "../ui/MovieCard.jsx";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";

function AnimeRecomendations() {
  const { clientAnimePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["animeRecomendations"],
    enabled: !!clientAnimePreferences,
    timeout: 2000,
    retry: 0,
    queryFn: () => getAnimeRecomendations(clientAnimePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <main>
      <ul>
        {data.data.map((el) => (
          <p key={el.id}>{el.attributes.slug}</p>
        ))}
      </ul>
    </main>
  );
}

export default AnimeRecomendations;
