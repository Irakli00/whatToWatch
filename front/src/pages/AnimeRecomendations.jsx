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
import RecomendationsFilter from "../ui/RecomendationsFilter.jsx";

function AnimeRecomendations() {
  const { clientAnimePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data: animes, isLoading } = useQuery({
    queryKey: ["animeRecomendations", clientAnimePreferences],
    enabled: !!clientAnimePreferences,
    retry: 0,
    queryFn: () => getAnimeRecomendations(clientAnimePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <main className="overflow-hidden bg-main-red-tint text-white">
      <section>
        <DraggableCardContainer
          key={"key"}
          className={"relative min-h-[600px]"}
        >
          {animes.data.map((anime, i) => {
            if (i === 0)
              return (
                <>
                  <button
                    draggable="false"
                    className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    NEW PAGE
                  </button>

                  <DraggableCardBody
                    key={`k-${i}`}
                    className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    paramId={anime.id}
                  >
                    <AnimeCard
                      key={`kiii-${anime.id}`}
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
                paramId={anime.id}
                key={`kk-${anime.id}`}
                className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
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

        <aside>
          <RecomendationsFilter
            key={"adkjksldj"}
            type="anime"
            preferences={clientAnimePreferences}
            isLoading={isLoading}
          ></RecomendationsFilter>
        </aside>
      </section>
    </main>
  );
}

export default AnimeRecomendations;
