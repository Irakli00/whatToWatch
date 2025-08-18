// const KITSU_KEY = import.meta.env.VITE_KISTU_KEY;

async function getAnimeRecomendations({ mediaType }) {
  const url = `https://kitsu.io/api/edge/anime`;
  console.log(url);

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/vnd.api+json", // correct for Kitsu
    },
  });

  if (!res.ok) {
    throw new Error(`Kitsu API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
export { getAnimeRecomendations };
