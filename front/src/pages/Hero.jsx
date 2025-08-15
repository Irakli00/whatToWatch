import { IoIosTrendingUp } from "react-icons/io";

import Carousel from "../ui/Carousel";
import HeroLink from "../ui/HeroLink";

function Hero() {
  return (
    <>
      <section className="bg-[var(--light-blue)]  min-h-[310px] flex justify-center ">
        <div className="container py-2.5 bg-gradient-to-r from-[var(--light-blue)] via-[#22e5ff] to-[var(--light-blue)]">
          <div className="flex gap-1.5 items-center">
            <IoIosTrendingUp className="h-[25px] w-[25px]" />
            <h1 className="text-2xl">Trending right now:</h1>
          </div>

          <Carousel></Carousel>
        </div>
      </section>
      <section className="container pt-5 text-center text-[var(--dark-blue)]">
        <h1 className="text-6xl font-bold">
          Can't decide what to watch tonight?
        </h1>

        <p className="text-2xl mt-4.5">
          Answer a few quick questions and get personalized recommendations for
          movies, anime, TV shows, and more tailored just for you.
        </p>

        <div className="flex justify-center items-center gap-28">
          <HeroLink to="/movies" type="movie">
            Choose a Movie
          </HeroLink>
          <HeroLink to="/anime" type="anime">
            Choose an Anime
          </HeroLink>
        </div>
      </section>
    </>
  );
}

export default Hero;
