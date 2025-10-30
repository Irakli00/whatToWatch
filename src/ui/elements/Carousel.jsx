import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MovieCard from "../cards/MovieCard";
import Spinner from "../primitives/Spinner";
import AnimeCard from "../cards/AnimeCard";

function Carousel({
  data,
  isLoading,
  className,
  autoplay = { delay: 0, disableOnInteraction: true, pauseOnMouseEnter: true },
  speed = 6000,
  slidesPerView = 10,
  type = "movie",
}) {
  if (isLoading) return <Spinner></Spinner>;

  return (
    <Swiper
      // spaceBetween={20}
      slidesPerView={slidesPerView}
      centeredSlides={true}
      modules={[Autoplay]}
      autoplay={autoplay || {}}
      loop={true}
      speed={speed}
      className={className}
    >
      {data.map((el) => {
        return type === "movie" ? (
          <SwiperSlide key={el.id} className="overflow-visible">
            <MovieCard cardType="simple" movie={el}></MovieCard>
          </SwiperSlide>
        ) : (
          <SwiperSlide key={el.name}>
            <AnimeCard cardType="simple" anime={el}></AnimeCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
