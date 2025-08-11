import { KEY } from "./.tmdbKey";

async function getTrending() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${KEY}`,
    },
  };

  const res = fetch(
    "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
    options
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return res;
}

export { getTrending };
// async function getTrending() {
//   const res = await fetch(
//     `https://private-anon-1929c54ba4-trakt.apiary-mock.com/movies/popular` //mock api
//   );

//   if (!res.ok) throw new Error("Network response was not ok");
//   return res.json();
// }

// export { getTrending };
