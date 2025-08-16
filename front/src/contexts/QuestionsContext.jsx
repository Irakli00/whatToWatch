import { createContext } from "react";

const QuestionsContext = createContext();

export function QuestionsProvider({ value, children }) {
  return (
    <QuestionsContext.Provider value={value}>
      {children}
    </QuestionsContext.Provider>
  );
}

export { QuestionsContext };
