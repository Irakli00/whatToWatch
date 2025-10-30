async function getTrendingAnimes(perPage = 20) {
  const query = `
    query ($perPage: Int) {
      Page(perPage: $perPage) {
        media(sort: TRENDING_DESC, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            medium
            large
          }
        }
      }
    }`;

  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { perPage },
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP Error:", response.status, errorText);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return;
    }

    return data.data.Page.media;
  } catch (error) {
    console.error("Network Error:", error);
  }
}

async function getAnimeRecomendations({
  mediaType, //uppercase
  genres, //genre_in
  releaseDate,
  status, // FINISHED, RELEASING, NOT_YET_RELEASED, CANCELLED, HIATUS
  subtype,
  sort, //Sorting options (POPULARITY_DESC, SCORE_DESC, etc.)
  rating,
}) {
  //sort and rating are iffy (expecially 5+ and lesser rated)
  const variables = {
    // genre_in: [...(genres ?? "Action"), "Drama"],
    genre_in: [...(genres ?? "Action"), "Drama"],
    type: mediaType ? mediaType.toUpperCase() : "ANIME",
    status: status ?? "FINISHED",
    format: subtype ?? (mediaType === "anime" ? "TV" : "MANGA"),
    sort: sort ?? "POPULARITY_DESC",
    averageScore_greater: rating ?? 4,
  };

  if (!releaseDate) {
    variables["startDate_greater"] = "20000000";
  } else {
    const [pivot, dateValue] = releaseDate;
    variables[pivot] = dateValue;
  }

  // excluded:
  // season
  // thumbnail(from trailer { })
  // coverImage{extraLarge, medium}
  // tags {id, name, description, category, rank, isGeneralSpoiler, isMediaSpoiler. isAdult}
  // meanScore
  // popularity
  // synonyms

  // ------------------
  // isLicensed; // Licensed for streaming
  // volumes; // For manga
  // chapters; // For manga
  // ------------------

  const query = `query(
    $genre_in: [String] 
    $type: MediaType 
    $status: MediaStatus
    $format: MediaFormat
    $sort: [MediaSort]
    $startDate_greater: FuzzyDateInt
    $startDate_lesser: FuzzyDateInt
    $averageScore_greater: Int
  ) {
    Page(perPage: 20) {
      media(
        genre_in: $genre_in, 
        type: $type,
        status: $status,
        format: $format,
        sort: $sort,
        startDate_greater: $startDate_greater
        averageScore_greater: $averageScore_greater
        startDate_lesser: $startDate_lesser
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
        studios{
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
        externalLinks {
          id
          url
          site
          type
          language
        }
        relations {
          edges {
            id
            relationType  
            node {
              id
              title { romaji english }
              type
              format
            }
          }
        }
        characters(perPage: 5) {
          edges {
            id
            role
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

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP Error:", response.status, errorText);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return;
    }

    return data.data.Page.media;
  } catch (error) {
    console.error("Network Error:", error);
  }
}
async function getSimilarAnimes(mediaId) {
  const query = `
    query($mediaId: Int!) {
      Page(perPage: 15) {
        recommendations(mediaId: $mediaId, sort: RATING_DESC) {
          id
          rating
          userRating
          mediaRecommendation {
            id
            title {
              romaji
              english
            }
            type
            format
            coverImage {
              medium
              large
            }
            averageScore
            genres
          }
        }
      }
    }`;
  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: { mediaId: mediaId },
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP Error:", response.status, errorText);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return;
    }

    return data.data.Page.recommendations;
  } catch (error) {
    console.error("Network Error:", error);
  }
}
async function getAnime(animeId) {
  const query = `
    query ($id: Int!) {
      Media(id: $id) {
        id
        title {
          romaji
          english
          native
          native
          userPreferred
        }
        type
        format
        episodes
        duration
        status
        description
        startDate { year month day }
        endDate { year month day }
        bannerImage
        coverImage {
          medium
          color
          large
          extraLarge
        }
        averageScore
        favourites
        genres
        source
        trailer {
          id
          site        
        }
        studios{
          edges {
            isMain
            node {
              id
              name
            }
          }
        }
        externalLinks {
          id
          url
          site
          type
          language
        }
        relations {
          edges {
            id
            relationType  
            node {
              id
              title { romaji english }
              type
              format
            }
          }
        }
        characters(perPage: 5) {
          edges {
            id
            role
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
    }`;

  const url = "https://graphql.anilist.co";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { id: animeId },
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("HTTP Error:", response.status, errorText);
      return;
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      return;
    }

    return data.data.Media;
  } catch (error) {
    console.error("Network Error:", error);
  }
}

export {
  getTrendingAnimes,
  getSimilarAnimes,
  getAnimeRecomendations,
  getAnime,
};

getTrendingAnimes();
