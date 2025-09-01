import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

function Carousel({ data, isLoading, className }) {
  if (isLoading) return <Spinner></Spinner>;
  return (
    <Swiper
      // spaceBetween={20}
      slidesPerView={10}
      centeredSlides={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      speed={6000}
      className={className}
    >
      {data.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <MovieCard type="simple" movie={movie}></MovieCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
