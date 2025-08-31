import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getMovieRecomendations } from "../services/tmdbApi.js";
import Spinner from "../ui/Spinner.jsx";
import MovieCard from "../ui/MovieCard.jsx";
import { useContext } from "react";
import { AppContext } from "../contexts/AppContext.jsx";
import RecomendationsFilter from "../ui/RecomendationsFilter.jsx";

import {
  DraggableCardBody,
  DraggableCardContainer,
} from "../ui/DraggableCard.jsx";
import Page from "../ui/Page.jsx";

function MovieRecomendations() {
  const { clientMoviePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data: movieData, isLoading } = useQuery({
    queryKey: ["movieRecomendations", clientMoviePreferences],

    enabled: !!clientMoviePreferences,
    retry: 0,
    queryFn: () => getMovieRecomendations(clientMoviePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <Page className="overflow-hidden bg-bright-yellow-tint">
      <section>
        {movieData ? (
          <DraggableCardContainer
            key={`d`}
            className={"relative min-h-[600px]"}
          >
            {/* <DraggableCardContainer
          className={"cusom-container mt-12 flex flex-wrap justify-around gap-2"}
        > */}
            {movieData.map((movie, i) => {
              if (i === 0)
                return (
                  <>
                    <button
                      key={i}
                      className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                      NEW PAGE
                    </button>

                    <DraggableCardBody
                      paramId={movie.id}
                      type={"movie"}
                      key={`k-${movie.id}`}
                      className={`absolute z-[${i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                    >
                      <MovieCard
                        type="extended"
                        padding="20px"
                        key={`key-${movie.id}`}
                        movie={movie}
                        // coverImgMaxW={"300px"}
                      />
                    </DraggableCardBody>
                  </>
                );

              return (
                <DraggableCardBody
                  paramId={movie.id}
                  type={"movie"}
                  key={`kk-${movie.id}`}
                  className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                >
                  <MovieCard
                    type="extended"
                    padding="20px"
                    key={`i-${movie.id}`}
                    movie={movie}
                    // coverImgMaxW={"300px"}
                  />
                </DraggableCardBody>
              );
            })}
          </DraggableCardContainer>
        ) : (
          <article>
            <h1>failed to fetch or nothing found idunno</h1>
          </article>
        )}

        <aside>
          <RecomendationsFilter
            preferences={clientMoviePreferences}
            isLoading={isLoading}
          ></RecomendationsFilter>
        </aside>
      </section>
    </Page>
  );
}

export default MovieRecomendations;
