// const KITSU_KEY = import.meta.env.VITE_KISTU_KEY;

async function getAnimeRecomendations({ mediaType }) {
  const url = `https://kitsu.io/api/edge/${mediaType || "manga"}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/vnd.api+json",
    },
  });

  if (!res.ok) {
    throw new Error(`Kitsu API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
export { getAnimeRecomendations };

async function getAnimeGenres(animeId, mediaType) {
  const url = `https://kitsu.io/api/edge/${mediaType}/${animeId}/relationships/genres`;
  const res = await fetch(url);
  const json = await res.json();

  return json.data;
}

export { getAnimeGenres };
