import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import MediaCard from "./MediaCard";
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
    <Swiper
      spaceBetween={50}
      slidesPerView={4}
      modules={[Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: true,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      speed={5000}
    >
      {data.results.map((movie) => {
        return (
          <SwiperSlide key={movie.id}>
            <MediaCard movie={movie}></MediaCard>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Carousel;
