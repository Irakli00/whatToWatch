function getAnimeRecomendations2({
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
  console.log(variables);

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
        season
        episodes
        duration
        source
        trailer {
          id
          site
          thumbnail
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
        bannerImage
        genres
        synonyms
        averageScore
        meanScore
        popularity
        favourites
        tags {
          id
          name
          description
          category
          rank
          isGeneralSpoiler
          isMediaSpoiler
          isAdult
        }
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
  const x = fetch(url, options).then((res) => res.json());
  return x;
}

export { getAnimeRecomendations2 };
