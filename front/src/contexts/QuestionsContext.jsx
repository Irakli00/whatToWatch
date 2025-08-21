import { createContext, useState } from "react";

import { MediaQuestion } from "../models/qustion";

const QuestionsContext = createContext();

const animeQuestions = [
  new MediaQuestion(
    "media-type",
    "mediaType",
    "What type of media do you prefer?"
  )
    .addOption("Anime", "anime", [
      new MediaQuestion("subtype", "subtype", "Subtype prefferences?")
        .addOption("No", null)
        .addOption("Yeah", null, [
          new MediaQuestion(
            "anime-subtype",
            "subtype",
            "What anime format do you prefer?"
          )
            .addOption("TV Series", "TV")
            .addOption("Movies", "movie")
            .addOption("OVA (Original Video Animation)", "OVA")
            .addOption("ONA (Original Net Animation)", "ONA")
            .addOption("Specials", "special")
            .addOption("Music Videos", "music"),
        ]),

      new MediaQuestion("season", "season", "Any prefered season")
        .addOption("Spring", "spring")
        .addOption("Summer", "summer")
        .addOption("Autumn", "autumn")
        .addOption("Winter", "winter")
        .addOption("No preferences", null),
    ])
    .addOption("Manga", "manga", [
      new MediaQuestion("subtype", "subtype", "Subtype prefferences?")
        .addOption("No", null)
        .addOption("Yeah", null, [
          new MediaQuestion(
            "manga-subtype",
            "subtype",
            "What Manga format do you prefer?"
          )
            .addOption("Traditional Manga", "manga")
            .addOption("Light Novel", "novel")
            .addOption("Manhwa", "manhwa")
            .addOption("Manhua ", "manhua")
            .addOption("Self-Published", "doujin")
            .addOption("One-shot", "oneshot"),
        ]),
    ]),

  new MediaQuestion("genres", "genres", "Preferred genres?")
    .addOption("Action", ["1"])
    .addOption("Comedy", ["3"])
    .addOption("Drama", ["4"])
    .addOption("Doesn't matter", null),

  new MediaQuestion("rating", "rating", "Minimum rating?")
    .addOption("7+", "7")
    .addOption("5+", "5")
    .addOption("Doesn't matter", null),

  new MediaQuestion("release-date", "releaseDate", "When was it released?")
    .addOption("After 2000", "2000..")
    .addOption("Before 2000", "..2000")
    .addOption("Doesn't matter", null),

  new MediaQuestion("status", "status", "Any Status?")
    .addOption("Ongoing", "current")
    .addOption("Finished", "finished")
    .addOption("To Be Announced", "tba")
    .addOption("Not Yet Released", "unreleased")
    .addOption("Scheduled for Future", "upcoming")
    .addOption("Surprise Me", null),
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
        .addOption("a", "animation")
        .addOption("m", "movie"),
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
