import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [questionNum, setQuestionNum] = useState(0);
  const movieQuestions = [
    {
      id: "media-type",
      key: "mediaType",
      questions: {
        questionText: "What type of media do you prefer?",
        options: [
          { text: "Animation", value: "animation" },
          {
            text: "Movie",
            value: "movie",
            followUps: [],
          },
        ],
      },
    },
    {
      id: "genres",
      key: "genres",
      questions: {
        questionText: "Preferred genres?",
        options: [
          { text: "Action", value: ["28"] },
          { text: "Comedy", value: ["35"] },
          { text: "Drama", value: ["18"] },
          { text: "Doesn't matter", value: null },
        ],
      },
    },
    {
      id: "rating",
      key: "rating",
      questions: {
        questionText: "Minimum rating?",
        options: [
          { text: "7+", value: "7" },
          { text: "5+", value: "5" },
          { text: "Doesn't matter", value: null },
        ],
      },
    },
    {
      id: "runtime",
      key: "runtime",
      questions: {
        questionText: "Preferred runtime?",
        options: [
          { text: "Short (<90 min)", value: { min: 1, max: 90 } },
          {
            text: "Medium (90–150 min)",
            value: { min: 90, max: 150 },
          },
          { text: "Long (>150 min)", value: { min: 150, max: 999 } },
          { text: "Doesn't matter", value: { min: 1, max: 999 } },
        ],
      },
    },
    {
      id: "language",
      key: "language",
      questions: {
        questionText: "Original language?",
        options: [
          { text: "English", value: "en-US" },
          { text: "French", value: "fr-FR" },
          { text: "Any language", value: null },
        ],
      },
    },
    {
      id: "region",
      key: "region",
      questions: {
        questionText: "Country of release?",
        options: [
          { text: "US", value: "US" },
          { text: "UK", value: "GB" },
          { text: "Any country", value: null },
        ],
      },
    },
    {
      id: "release-date",
      key: "releaseDate",
      questions: {
        questionText: "When was it released?",
        options: [
          {
            text: "After 2010",
            value: `primary_release_date.gte=2010-01-01&primary_release_date.lte=${new Date().toISOString().split("T")[0]}`,
          },
          {
            text: "Before 2010",
            value: "release_date.lte=2010-01-01",
          },
          { text: "Doesn't matter", value: null },
        ],
      },
    },
  ];

  const [clientMoviePreferences, setClientMoviePreferences] = useState({
    mediaType: null,
    movieReleaseDate: null,
    genres: null,
    year: null,
  });

  return (
    <AppContext.Provider
      value={{
        movieQuestions,
        clientMoviePreferences,
        setClientMoviePreferences,
        questionNum,
        setQuestionNum,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
