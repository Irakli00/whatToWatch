import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";

import Page from "../ui/layout/Page.jsx";
import {
  DraggableCardContainer,
  DraggableCardBody,
} from "../ui/cards/DraggableCard.jsx";
import RecomendationsFilter from "../ui/elements/RecomendationsFilter.jsx";
import AnimeCard from "../ui/cards/AnimeCard.jsx";
import Spinner from "../ui/primitives/Spinner.jsx";

import { AppContext } from "../contexts/AppContext.jsx";

import { getAnimeRecomendations2 } from "../services/aliListApi.js";

function AnimeRecomendations() {
  const { clientAnimePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["animeRecomendations", clientAnimePreferences],
    enabled: !!clientAnimePreferences,
    retry: 0,
    queryFn: () => getAnimeRecomendations2(clientAnimePreferences),
    // queryFn: () => getAnimeRecomendations2(clientAnimePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  const animesData = data.data.Page.media;

  animesData.forEach((anime) => {
    const img = new Image();
    img.src = anime.coverImage?.large;

    localStorage.setItem(anime.id, JSON.stringify(anime)); //make this on hover on cards?
  }); //prefetch

  return (
    <Page className="overflow-hidden bg-main-red-tint text-white">
      <section>
        <DraggableCardContainer
          key={Math.random() * Math.random()}
          className={"relative min-h-[600px]"}
        >
          {animesData.map((anime, i) => {
            // console.log(anime.id);
            if (i === 0)
              return (
                <React.Fragment key={i}>
                  <button
                    draggable="false"
                    className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    NEW PAGE
                  </button>

                  <DraggableCardBody
                    type={"anime"}
                    key={`k-${i || Math.random() * Math.random()}`}
                    className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    paramId={anime.id}
                  >
                    <AnimeCard
                      key={`kiii-${anime.id || Math.random() * Math.random()}`} //good enough so far
                      anime={anime}
                      height="full"
                      // coverImgMaxW={"300px"}
                      coverImgMinW={"full"}
                    />
                  </DraggableCardBody>
                </React.Fragment>
              );

            return (
              <DraggableCardBody
                type={"anime"}
                paramId={anime.id}
                key={`kk-${anime.id || Math.random() * Math.random()}`}
                className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <AnimeCard
                  key={anime.id || Math.random() * Math.random()}
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
    </Page>
  );
}

export default AnimeRecomendations;
