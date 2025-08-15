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
          {
            text: "Movie",
            value: "movie",
            followUps: [
              {
                id: "movie-genre",
                key: "movieGenre",
                questions: {
                  questionText: "What exactly?",
                  options: [
                    { text: "Action", value: "action" },
                    { text: "Comedy", value: "comedy" },
                    { text: "Drama", value: "drama" },
                  ],
                },
              },
              {
                id: "movie-genre",
                key: "movieGenre",
                questions: {
                  questionText: "222",
                  options: [
                    { text: "2222222", value: "2222222" },
                    { text: "3333333", value: "3333333" },
                    { text: "4444444", value: "4444444" },
                  ],
                },
              },
            ],
          },
          {
            text: "TV Show",
            value: "show",
            followUps: [
              {
                id: "show-type",
                key: "showType",
                questions: {
                  questionText: "What type of TV show?",
                  options: [
                    { text: "Series", value: "series" },
                    { text: "Mini-series", value: "mini-series" },
                    { text: "Documentary", value: "documentary" },
                  ],
                },
              },
            ],
          },
          {
            text: "Animation",
            value: "animation",
            // No follow-ups for animation
          },
        ],
      },
    },
    {
      id: "viewing-time",
      key: "viewingTime",
      questions: {
        questionText: "When do you usually watch?",
        options: [
          {
            text: "Evening",
            value: "evening",
            followUps: [
              {
                id: "evening-duration",
                key: "eveningDuration",
                questions: {
                  questionText: "How long do you watch in the evening?",
                  options: [
                    { text: "1 hour", value: "1h" },
                    { text: "2-3 hours", value: "2-3h" },
                    { text: "Binge watch", value: "binge" },
                  ],
                },
              },
            ],
          },
          { text: "Morning", value: "morning" },
          { text: "Afternoon", value: "afternoon" },
        ],
      },
    },
    {
      id: "budget",
      key: "budget",
      questions: {
        questionText: "What's your streaming budget?",
        options: [
          { text: "Free only", value: "free" },
          { text: "Under $15/month", value: "budget" },
          { text: "Premium ($15+)", value: "premium" },
        ],
      },
    },
  ];

  const [clientPreferences, setClientPreferences] = useState({
    mediaType: null,
    genre: null,
    year: null,
  });

  return (
    <AppContext.Provider
      value={{
        movieQuestions,
        clientPreferences,
        setClientPreferences,
        questionNum,
        setQuestionNum,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
