import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import MovieCard from "./MovieCard";
import Spinner from "./Spinner";

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
            <MovieCard type="simple" movie={el}></MovieCard>
          </SwiperSlide>
        ) : (
          <SwiperSlide key={el.name}>
            <article className=" flex gap-1 max-w-[20%] items-center">
              <img
                className=" max-w-[120px]  rounded-[50%] aspect-[1/1]"
                draggable={false}
                // const [notLoaded, setNotLoaded] = useState();
                // onError={() => setNotLoaded(true)} //if not loaded display something else
                src={`https://image.tmdb.org/t/p/w300/${el.profile_path}`}
              />
              <figcaption className="text-center flex flex-col gap-1">
                <span className="font-bold">{el.name}</span>
                <span>{el.character}</span>
              </figcaption>
            </article>
          </SwiperSlide>

          //           {cast.slice(0, 5).map((p) => (

          // ))}
        );
      })}
    </Swiper>
  );
}

export default Carousel;
