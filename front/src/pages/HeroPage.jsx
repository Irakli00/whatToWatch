import { IoIosTrendingUp } from "react-icons/io";

import Carousel from "../ui/Carousel";

function HeroPage() {
  return (
    <main>
      <section className="bg-[var(--light-blue)] py-1">
        <div className="container">
          <div className="flex gap-1.5 items-center">
            <IoIosTrendingUp className="h-[25px] w-[25px]" />
            <h1 className="text-2xl">Trending right now:</h1>
          </div>
          <Carousel></Carousel>
        </div>
      </section>
      <section>
        <h1>Can't decide what to watch tonight?</h1>

        <p>
          Answer a few quick questions and get personalized recommendations for
          movies, anime, TV shows, and more tailored just for you.
        </p>

        <button>Start Quiz</button>
      </section>
    </main>
  );
}

export default HeroPage;
