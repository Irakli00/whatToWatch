import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { AppContext } from "../contexts/AppContext.jsx";
import { getAnimeRecomendations } from "../services/kistuApi.js";
import Spinner from "../ui/Spinner.jsx";
import AnimeCard from "../ui/AnimeCard.jsx";

function AnimeRecomendations() {
  const { clientAnimePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data: animes, isLoading } = useQuery({
    queryKey: ["animeRecomendations"],
    enabled: !!clientAnimePreferences,
    retry: 0,
    queryFn: () => getAnimeRecomendations(clientAnimePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <main>
      <ul>
        {animes.data.map((el) => (
          <AnimeCard anime={el} key={el.id}></AnimeCard>
        ))}
      </ul>
    </main>
  );
}

export default AnimeRecomendations;
