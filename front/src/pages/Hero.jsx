import { IoIosTrendingUp } from "react-icons/io";

import Carousel from "../ui/Carousel";
import HeroLink from "../ui/HeroLink";
import Page from "../ui/Page";
import { getTrending } from "../services/tmdbApi";
import { useQuery } from "@tanstack/react-query";

function Hero() {
  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
    staleTime: 999999 * 999999,
  });

  return (
    <Page className={"overflow-hidden bg-gray-200"}>
      <section className="bg-light-blue ">
        <div className="container mx-auto pt-2 min-h-[340px]">
          <div className="flex gap-1.5 items-center">
            <IoIosTrendingUp className="h-[25px] w-[25px]" />
            <h1 className="text-2xl">Trending movies right now:</h1>
          </div>

          <Carousel data={data} isLoading={isLoading} />
        </div>
      </section>

      <section className="cusom-container pt-5 text-center text-dark-blue">
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
      {/* </main> */}
    </Page>
  );
}

export default Hero;
