import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { AppContext } from "../contexts/AppContext";
import Page from "../ui/layout/Page";

import Carousel from "../ui/elements/Carousel";
import HeroLink from "../ui/primitives/HeroLink";

import { IoIosTrendingUp } from "react-icons/io";

import { getTrendingMovies } from "../services/tmdbApi";
import { getTrendingAnimes } from "../services/aliListApi";

function Hero() {
  const { clientPrefferedMedia } = useContext(AppContext);
  const x = { anime: () => getTrendingAnimes(40), movie: getTrendingMovies };

  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: x[clientPrefferedMedia],
    staleTime: 60 * 60 * 1000,
  });

  return (
    <Page className={"overflow-hidden bg-gray-200"}>
      <section className="bg-light-blue ">
        <div className="container overflow-x-hidden mx-auto pt-2 min-h-[340px]">
          <div className="flex gap-1.5 items-center">
            <IoIosTrendingUp className="h-[25px] w-[25px]" />
            <h1 className="text-2xl">Trending right now:</h1>
          </div>

          <Carousel
            type={clientPrefferedMedia}
            data={data}
            isLoading={isLoading}
            className={"overflow-visible!"}
          />
        </div>
      </section>

      <section className="cusom-container mt-8 text-center text-dark-blue">
        <h1 className="text-6xl font-bold">
          Can't decide what to watch tonight?
        </h1>

        <p className="text-2xl mt-4.5">
          Answer a few quick questions and get personalized recommendations for
          movies, anime, TV shows, and more tailored just for you.
        </p>

        <div className="flex justify-center items-center gap-28">
          <HeroLink to="/selectMovies" type="movie">
            Choose a Movie
          </HeroLink>
          <HeroLink to="/selectAnimes" type="anime">
            Choose an Anime
          </HeroLink>
        </div>
      </section>
    </Page>
  );
}

export default Hero;
