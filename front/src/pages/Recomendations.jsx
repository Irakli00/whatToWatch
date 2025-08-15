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
    queryFn: () => getRecomendations(clientMoviePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <ul>
      {data.results.map((el) => (
        <MediaCard key={el.id} movie={el}></MediaCard>
      ))}
    </ul>
  );
}

export default Recomendations;
