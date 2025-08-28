import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MovieCard from "./MovieCard";
import { getTrending } from "../services/tmdbApi";
import Spinner from "./Spinner";

function Carousel() {
  // eslint-disable-next-line no-unused-vars
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: getTrending,
  });

  if (isLoading) return <Spinner></Spinner>;

  return (
    <div className="overflow-x-hidden overflow-y-visible h-[120%]">
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
      >
        {data.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              <MovieCard type="simple" movie={movie}></MovieCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Carousel;
