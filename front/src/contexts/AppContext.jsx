import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [questionNum, setQuestionNum] = useState(0);
  const movieQuestions = [
    { key: "mediaType", question: "What media?", options: ["ONE", "ANOTHER"] },
    { key: "genre", question: "What Genre?", options: ["ONE", "ANOTHER"] },
    { key: "year", question: "What year?", options: ["ONE", "ANOTHER"] },
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
