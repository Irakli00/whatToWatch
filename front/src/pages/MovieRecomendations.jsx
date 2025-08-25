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

function MovieRecomendations() {
  const { clientMoviePreferences } = useContext(AppContext);

  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["movieRecomendations"],
    enabled: !!clientMoviePreferences,
    retry: 0,
    queryFn: () => getMovieRecomendations(clientMoviePreferences),
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <section>
      {data.results ? (
        <DraggableCardContainer className={"relative min-h-[600px]"}>
          {/* <DraggableCardContainer
          className={"container mt-12 flex flex-wrap justify-around gap-2"}
        > */}
          {data.results.map((movie, i) => {
            if (i === 0)
              return (
                <>
                  <DraggableCardBody
                    type={"move"}
                    key={i}
                    className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <button>NEW PAGE</button>
                  </DraggableCardBody>

                  <DraggableCardBody
                    type={"movie"}
                    key={movie.id}
                    className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
                  >
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      height="full"
                      // coverImgMaxW={"300px"}
                      coverImgMinW={"full"}
                    />
                  </DraggableCardBody>
                </>
              );

            return (
              <DraggableCardBody
                type={"movie"}
                key={movie.id}
                className={`absolute z-[${999 - i}] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
              >
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  height="full"
                  // coverImgMaxW={"300px"}
                  coverImgMinW={"full"}
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
        ></RecomendationsFilter>
      </aside>
    </section>
  );
}

export default MovieRecomendations;
