import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MediaCard from "./MediaCard";

function Carousel() {
  const movies = [
    {
      id: 1,
      title: "The Dark Knight",
      genre: "Action, Crime, Drama",
      rating: 9.0,
      year: 2008,
      image:
        "https://via.placeholder.com/300x450/333333/ffffff?text=The+Dark+Knight",
    },
    {
      id: 2,
      title: "Inception",
      genre: "Action, Sci-Fi, Thriller",
      rating: 8.8,
      year: 2010,
      image: "https://via.placeholder.com/300x450/444444/ffffff?text=Inception",
    },
    {
      id: 3,
      title: "Interstellar",
      genre: "Adventure, Drama, Sci-Fi",
      rating: 8.6,
      year: 2014,
      image:
        "https://via.placeholder.com/300x450/555555/ffffff?text=Interstellar",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      genre: "Crime, Drama",
      rating: 8.9,
      year: 1994,
      image:
        "https://via.placeholder.com/300x450/666666/ffffff?text=Pulp+Fiction",
    },
    {
      id: 5,
      title: "The Matrix",
      genre: "Action, Sci-Fi",
      rating: 8.7,
      year: 1999,
      image:
        "https://via.placeholder.com/300x450/777777/ffffff?text=The+Matrix",
    },
    {
      id: 6,
      title: "Goodfellas",
      genre: "Biography, Crime, Drama",
      rating: 8.7,
      year: 1990,
      image:
        "https://via.placeholder.com/300x450/888888/ffffff?text=Goodfellas",
    },
  ];
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={5}
      modules={[Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      loop={true}
      speed={5000}
    >
      {movies.map((movie) => {
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
