async function getAnimeRecomendations({
  mediaType, //uppercase
  genres, //genre_in
  releaseDate,
  status, // FINISHED, RELEASING, NOT_YET_RELEASED, CANCELLED, HIATUS
  subtype,
  sort, //Sorting options (POPULARITY_DESC, SCORE_DESC, etc.)
}) {
  const variables = {
    // genre_in: [genres],
    genre_in: ["Action", "Drama"],
    // type: mediaType.toUpperCase(),
    type: "ANIME",
    status: "FINISHED",
    // status: status,
    // format: subtype,
    format: "TV",
    // sort: sort,
    sort: "POPULARITY_DESC",
    // startDate_greater: "20000403",
    startDate_greater: "20000403",
  };

  // excluded:
  // season
  // thumbnail(from trailer { })
  // coverImage{extraLarge, medium}
  // tags {id, name, description, category, rank, isGeneralSpoiler, isMediaSpoiler. isAdult}
  // meanScore
  // popularity
  // synonyms

  const query = `query(
    $genre_in: [String] 
    $type: MediaType 
    $status: MediaStatus
    $format: MediaFormat
    $sort: [MediaSort]
    $startDate_greater: FuzzyDateInt
  ) {
    Page(perPage: 20) {
      media(
        genre_in: $genre_in, 
        type: $type,
        status: $status,
        format: $format,
        sort: $sort
        startDate_greater:$startDate_greater
      ) {
        id
        title {
          romaji
          english
          native
          userPreferred
        }
        type
        format
        status
        description
        startDate { year month day }
        endDate { year month day }
        episodes
        duration
        source
        trailer {
          id
          site        
        }
        coverImage {
          large
          color
          extraLarge
        }
        bannerImage
        genres
        averageScore
        favourites
        studios(isMain: true) {
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
        characters(perPage: 5) {
          edges {
            id
            role
            name
            voiceActors(language: JAPANESE) {
              id
              name { full native }
              language
              image { large medium }
            }
            node {
              id
              name { full native alternative }
              image { large medium }
              description
              gender
              dateOfBirth { year month day }
              age
            }
          }
        }
        staff(perPage: 5) {
          edges {
            id
            role
            node {
              id
              name { full native }
              language
              image { large medium }
            }
          }
        }
      }
    }
  }`;

  const url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };
  const x = await fetch(url, options)
    .then((res) => res.json())
    .then((data) => data.data.Page.media);
  return x;
}

export { getAnimeRecomendations };
