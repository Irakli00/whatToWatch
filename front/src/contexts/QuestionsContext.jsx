import { createContext, useState } from "react";

import { MediaQuestion } from "../models/qustion";

const QuestionsContext = createContext();

const animeQs = [
  new MediaQuestion("mediaType", "What type of media do you prefer?")
    .addOption("Anime", "anime", [
      new MediaQuestion("releaseDate", "Released when?")
        .addOption(
          "Before 2000",
          ["startDate_lesser", "20000000"],
          [
            new MediaQuestion("subtype", "Subtype prefferences?")
              .addOption("No", null)
              .addOption("Yeah", null, [
                new MediaQuestion("subtype", "What anime format do you prefer?")
                  .addOption("TV Series", "TV", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "FINISHED")
                      .addOption("Either", null),
                  ])
                  .addOption("Movies", "MOVIE")
                  .addOption("OVA (Original Video Animation)", "OVA")
                  .addOption("ONA (Original Net Animation)", "ONA")
                  .addOption("Specials", "SPECIAL")
                  .addOption("Music Videos", "MUSIC"),
              ]),
          ]
        )
        .addOption(
          "After 2000",
          ["startDate_greater", "20000000"],
          [
            new MediaQuestion("subtype", "Subtype prefferences?")
              .addOption("No", null)
              .addOption("Yeah", null, [
                new MediaQuestion("subtype", "What anime format do you prefer?")
                  .addOption("TV Series", "TV", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "finished")
                      .addOption("To Be Announced", "tba")
                      .addOption("Not Yet Released", "unreleased")
                      .addOption("Scheduled for Future", "upcoming")
                      .addOption("Surprise Me", null),
                  ])
                  .addOption("Movies", "MOVIE")
                  .addOption("OVA (Original Video Animation)", "OVA")
                  .addOption("ONA (Original Net Animation)", "ONA")
                  .addOption("Specials", "SPECIAL")
                  .addOption("Music Videos", "MUSIC"),
              ]),
          ]
        )
        .addOption("Doesn't matter", null),
    ])
    .addOption("Manga", "manga", [
      new MediaQuestion("releaseDate", "Released when?")
        .addOption(
          "Before 2000",
          ["startDate_lesser", "20000000"],
          [
            new MediaQuestion("subtype", "Subtype prefferences?")
              .addOption("No", null)
              .addOption("Yeah", null, [
                new MediaQuestion("subtype", "What Manga format do you prefer?")
                  .addOption("Traditional Manga", "MANGA", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "FINISHED")
                      .addOption("Either", null),
                  ])
                  .addOption("Light Novel", "NOVEL", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "FINISHED"),
                  ])
                  .addOption("One-shot", "ONE_SHOT"),
              ]),
          ]
        )
        .addOption(
          "After 2000",
          ["startDate_greater", "20000000"],
          [
            new MediaQuestion("subtype", "Subtype prefferences?")
              .addOption("No", null)
              .addOption("Yeah", null, [
                new MediaQuestion("subtype", "What Manga format do you prefer?")
                  .addOption("Traditional Manga", "MANGA", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "finished")
                      .addOption("To Be Announced", "tba")
                      .addOption("Not Yet Released", "unreleased")
                      .addOption("Scheduled for Future", "upcoming")
                      .addOption("Surprise Me", null),
                  ])
                  .addOption("Light Novel", "NOVEL", [
                    new MediaQuestion("status", "Any Status?")
                      .addOption("Ongoing", "RELEASING")
                      .addOption("Finished", "FINISHED")
                      .addOption("To Be Announced", "tba")
                      .addOption("Not Yet Released", "unreleased")
                      .addOption("Scheduled for Future", "upcoming")
                      .addOption("Surprise Me", null),
                  ])
                  .addOption("One-shot", "ONE_SHOT"),
              ]),
          ]
        )
        .addOption("Doesn't matter", null),
    ]),

  new MediaQuestion("genres", "Preferred genres?")
    .addOption("Action", "Action")
    .addOption("Comedy", "Comedy")
    .addOption("Drama", "Drama")
    .addOption("Doesn't matter", null),

  new MediaQuestion("rating", "Minimum rating?")
    .addOption("7+", 7)
    .addOption("5+", 5)
    .addOption("Doesn't matter", null),

  new MediaQuestion("sort", "Sort by?")
    // POPULARITY_DESC, SCORE_DESC
    .addOption("Populars first", "POPULARITY_DESC")
    .addOption("Lower rated first", "SCORE_DESC"),
];

const movieQs = [
  // sort_by = popularity.desc;

  // &certification=PG-13
  // &certification.lte=R

  // &primary_release_year=2023

  // &with_release_type=3

  //with_runtime.gte=90&with_runtime.lte=180

  // &with_original_language=en
  new MediaQuestion("mediaType", "What type of media do you prefer?")
    .addOption("Animation", "animation")
    .addOption("Movie", "movie"),

  new MediaQuestion("genres", "genres", "Preferred genres?")
    .addOption("Action", ["28"])
    .addOption("Comedy", ["35"])
    .addOption("Drama", ["18"])
    .addOption("Doesn't matter", null),

  new MediaQuestion("certifications", "Preferred Certification?")
    .addOption("Yeah", "oki", [
      new MediaQuestion("certifications", "Which one?")
        .addOption("G", "certification.G")
        .addOption("GPG", "certification.GPG")
        .addOption("PG-13", "certification.PG-13")
        .addOption("R", "certification.R")
        .addOption("NC-17", "certification.NC-17"),
    ])
    .addOption("Nah", null),

  // &certification.lte=R

  new MediaQuestion("rating", "Minimum rating?")
    .addOption("7+", "vote_average.gte=7")
    .addOption("5+", "vote_average.gte=5")
    .addOption("Doesn't matter", null),

  // new MediaQuestion("runtime", "runtime", "Preferred runtime?")
  //   .addOption("Short (<90 min)", { min: 1, max: 90 })
  //   .addOption("Medium (90–150 min)", { min: 90, max: 150 })
  //   .addOption("Long (>150 min)", { min: 150, max: 999 })
  //   .addOption("Doesn't matter", { min: 1, max: 999 }),

  new MediaQuestion("language", "Original language?")
    .addOption("English", "en-US")
    .addOption("French", "fr-FR")
    .addOption("Any language", null),

  new MediaQuestion("releaseDate", "When was it released?")
    .addOption(
      "After 2000",
      `primary_release_date.gte=2000-01-01`
      // `primary_release_date.gte=2000-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}`
    )
    .addOption("Before 2000", "release_date.lte=2000-01-01")
    .addOption("Doesn't matter", null),

  new MediaQuestion("sort", "Sort by?")
    .addOption("Populars first", "popularity.desc")
    .addOption("Less known first", "popularity.asc")
    .addOption("Higher rated first", "vote_average.asc")
    .addOption("Lower rated first", "vote_average.desc"),
];

const movieFilterOptions = {
  mediaType: [
    { value: "animation", key: "Animation" },
    { value: "movie", key: "Movie" },
  ],
  genres: [
    { value: 28, key: "Action" },
    { value: 12, key: "Adventure" },
    { value: 16, key: "Animation" },
    { value: 35, key: "Comedy" },
    { value: 80, key: "Crime" },
    { value: 99, key: "Documentary" },
    { value: 18, key: "Drama" },
    { value: 10751, key: "Family" },
    { value: 14, key: "Fantasy" },
    { value: 36, key: "History" },
    { value: 27, key: "Horror" },
    { value: 10402, key: "Music" },
    { value: 9648, key: "Mystery" },
    { value: 10749, key: "Romance" },
    { value: 878, key: "Science Fiction" },
    { value: 10770, key: "TV Movie" },
    { value: 53, key: "Thriller" },
    { value: 10752, key: "War" },
    { value: 37, key: "Western" },
  ],
  language: [
    { value: "en", key: "English" },
    { value: "es", key: "Spanish" },
    { value: "fr", key: "French" },
    { value: "de", key: "German" },
    { value: "it", key: "Italian" },
    { value: "ja", key: "Japanese" },
    { value: "ko", key: "Korean" },
    { value: "zh", key: "Chinese" },
    { value: "pt", key: "Portuguese" },
    { value: "ru", key: "Russian" },
    { value: "hi", key: "Hindi" },
  ],
  rating: [
    { value: "7", key: "7+" },
    { value: "5", key: "5+" },
  ],
  region: [
    { value: "US", key: "US" },
    { value: "UK", key: "GB" },
  ],
  releaseDate: [
    { value: "primary_release_date.gte=2000-01-01", key: "After 2000" },
    { value: "release_date.lte=2000-01-01", key: "Before 2000" },
  ],
};
// runtime: [
//   { value: { min: 1, max: 90 }, key: "Short (<90 min)" },
//   { value: { min: 90, max: 150 }, key: "Medium (90–150 min)" },
//   { value: { min: 150, max: 999 }, key: "Long (>150 min)" },
// ],

const animeFilterOptions = {
  mediaType: [
    { value: "animation", key: "Animation" },
    { value: "movie", key: "Movie" },
  ],
  genres: [
    { value: 28, key: "Action" },
    { value: 12, key: "Adventure" },
    { value: 16, key: "Animation" },
    { value: 35, key: "Comedy" },
    { value: 80, key: "Crime" },
    { value: 99, key: "Documentary" },
    { value: 18, key: "Drama" },
    { value: 10751, key: "Family" },
    { value: 14, key: "Fantasy" },
    { value: 36, key: "History" },
    { value: 27, key: "Horror" },
    { value: 10402, key: "Music" },
    { value: 9648, key: "Mystery" },
    { value: 10749, key: "Romance" },
    { value: 878, key: "Science Fiction" },
    { value: 10770, key: "TV Movie" },
    { value: 53, key: "Thriller" },
    { value: 10752, key: "War" },
    { value: 37, key: "Western" },
  ],
  language: [
    { value: "en", key: "English" },
    { value: "es", key: "Spanish" },
    { value: "fr", key: "French" },
    { value: "de", key: "German" },
    { value: "it", key: "Italian" },
    { value: "ja", key: "Japanese" },
    { value: "ko", key: "Korean" },
    { value: "zh", key: "Chinese" },
    { value: "pt", key: "Portuguese" },
    { value: "ru", key: "Russian" },
    { value: "hi", key: "Hindi" },
  ],
  rating: [
    { value: "7", key: "7+" },
    { value: "5", key: "5+" },
  ],
  region: [
    { value: "US", key: "US" },
    { value: "UK", key: "GB" },
  ],
  releaseDate: [
    { value: "primary_release_date.gte=2000-01-01", key: "After 2000" },
    { value: "release_date.lte=2000-01-01", key: "Before 2000" },
  ],
};

export function QuestionsProvider({ children }) {
  const [questionNum, setQuestionNum] = useState(0);

  return (
    <QuestionsContext.Provider
      value={{
        animeQs,
        movieQs,
        movieFilterOptions,
        animeFilterOptions,
        questionNum,
        setQuestionNum,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export { QuestionsContext };
