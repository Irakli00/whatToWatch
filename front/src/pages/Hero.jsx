import { IoIosTrendingUp } from "react-icons/io";

import Carousel from "../ui/Carousel";
import HeroLink from "../ui/HeroLink";
import Page from "../ui/Page";

function Hero() {
  return (
    <Page className={"overflow-hidden bg-gray-200"}>
      {/* <main className="overflow-hidden bg-gray-200"> */}
      <section className="bg-light-blue min-h-[338px] overflow-hidden flex justify-center">
        <div className="container py-4.5 bg-gradient-to-r from-light-blue via-[#22e5ff] to-light-blue">
          <div className="flex gap-1.5 items-center">
            <IoIosTrendingUp className="h-[25px] w-[25px]" />
            <h1 className="text-2xl">Trending movies right now:</h1>
          </div>

          <Carousel />
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
