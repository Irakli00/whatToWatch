import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";

import { AppContext } from "../contexts/AppContext.jsx";
import { getAnimeRecomendations } from "../services/kistuApi.js";
import Spinner from "../ui/Spinner.jsx";
import AnimeCard from "../ui/AnimeCard.jsx";
import {
  DraggableCardContainer,
  DraggableCardBody,
} from "../ui/DraggableCard.jsx";

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
    <section>
      <DraggableCardContainer className={"relative min-h-[600px]"}>
        {animes.data.map((anime, i) => {
          if (i === 0)
            return (
              <>
                <DraggableCardBody
                  key={i}
                  className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <button>NEW PAGE</button>
                </DraggableCardBody>

                <DraggableCardBody
                  key={`k-${i}`}
                  className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <AnimeCard
                    key={`k-${anime.id}`}
                    anime={anime}
                    height="full"
                    // coverImgMaxW={"300px"}
                    coverImgMinW={"full"}
                  />
                </DraggableCardBody>
              </>
            );

          return (
            <DraggableCardBody
              key={`k-${anime.id}`}
              className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
            >
              <AnimeCard
                key={anime.id}
                anime={anime}
                height="full"
                // coverImgMaxW={"300px"}
                coverImgMinW={"full"}
              />
            </DraggableCardBody>
          );
        })}
      </DraggableCardContainer>
    </section>
  );
}

export default AnimeRecomendations;
