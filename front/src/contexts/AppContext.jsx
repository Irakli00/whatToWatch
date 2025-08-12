import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [questionNum, setQuestionNum] = useState(0);

  const movieQuestions = [
    {
      key: "mediaType",
      question: "What media?",
      options: [
        { text: "Movie", value: "movie" },
        { text: "Animation", value: "animation" },
        { text: "Show", value: "show" },
      ],
    },
    {
      key: "genre",
      question: "What Genre?",
      options: [
        { text: "1", value: "1" },
        { text: "2", value: "2" },
        { text: "3", value: "3" },
      ],
    },
    {
      key: "year",
      question: "What year?",
      options: [
        { text: "a", value: "a" },
        { text: "b", value: "b" },
        { text: "c", value: "c" },
      ],
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
