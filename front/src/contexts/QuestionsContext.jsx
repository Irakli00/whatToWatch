import { createContext, useState } from "react";

import { MediaQuestion } from "../models/qustion";

const QuestionsContext = createContext();

const animeQuestions = [
  new MediaQuestion(
    "media-type",
    "mediaType",
    "What type of media do you prefer?"
  )
    .addOption("Anime", "anime")
    .addOption("Manga", "manga", [
      new MediaQuestion("media-type-followup", "mediaType", "111111111111111")
        .addOption("1111111", "anime")
        .addOption("1111111", "manga"),
    ]),

  new MediaQuestion("genres", "genres", "Preferred genres?")
    .addOption("Action", ["28"])
    .addOption("Comedy", ["35"])
    .addOption("Drama", ["18"])
    .addOption("Doesn't matter", null),

  new MediaQuestion("rating", "rating", "Minimum rating?")
    .addOption("7+", "7")
    .addOption("5+", "5")
    .addOption("Doesn't matter", null),

  new MediaQuestion("runtime", "runtime", "Preferred runtime?")
    .addOption("Short (<90 min)", { min: 1, max: 90 })
    .addOption("Medium (90–150 min)", { min: 90, max: 150 })
    .addOption("Long (>150 min)", { min: 150, max: 999 })
    .addOption("Doesn't matter", { min: 1, max: 999 }),

  new MediaQuestion("language", "language", "Original language?")
    .addOption("English", "en-US")
    .addOption("French", "fr-FR")
    .addOption("Any language", null),

  new MediaQuestion("region", "region", "Country of release?")
    .addOption("US", "US")
    .addOption("UK", "GB")
    .addOption("Any country", null),

  new MediaQuestion("release-date", "releaseDate", "When was it released?")
    .addOption(
      "After 2000",
      `primary_release_date.gte=2000-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}`
    )
    .addOption("Before 2000", "release_date.lte=2000-01-01")
    .addOption("Doesn't matter", null),
];

const movieQuestions = [
  new MediaQuestion(
    "media-type",
    "mediaType",
    "What type of media do you prefer?"
  )
    .addOption("Animation", "animation")
    .addOption("Movie", "movie", [
      new MediaQuestion("media-type-followup", "mediaType", "111111111111111")
        .addOption("1111111", "animation")
        .addOption("1111111", "movie"),
    ]),

  new MediaQuestion("genres", "genres", "Preferred genres?")
    .addOption("Action", ["28"])
    .addOption("Comedy", ["35"])
    .addOption("Drama", ["18"])
    .addOption("Doesn't matter", null),

  new MediaQuestion("rating", "rating", "Minimum rating?")
    .addOption("7+", "7")
    .addOption("5+", "5")
    .addOption("Doesn't matter", null),

  new MediaQuestion("runtime", "runtime", "Preferred runtime?")
    .addOption("Short (<90 min)", { min: 1, max: 90 })
    .addOption("Medium (90–150 min)", { min: 90, max: 150 })
    .addOption("Long (>150 min)", { min: 150, max: 999 })
    .addOption("Doesn't matter", { min: 1, max: 999 }),

  new MediaQuestion("language", "language", "Original language?")
    .addOption("English", "en-US")
    .addOption("French", "fr-FR")
    .addOption("Any language", null),

  new MediaQuestion("region", "region", "Country of release?")
    .addOption("US", "US")
    .addOption("UK", "GB")
    .addOption("Any country", null),

  new MediaQuestion("release-date", "releaseDate", "When was it released?")
    .addOption(
      "After 2000",
      `primary_release_date.gte=2000-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}`
    )
    .addOption("Before 2000", "release_date.lte=2000-01-01")
    .addOption("Doesn't matter", null),
];

export function QuestionsProvider({ children }) {
  const [questionNum, setQuestionNum] = useState(0);

  return (
    <QuestionsContext.Provider
      value={{ animeQuestions, movieQuestions, questionNum, setQuestionNum }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export { QuestionsContext };
