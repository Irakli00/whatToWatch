import { createContext } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  return (
    <AppContext.Provider
      value={{
        something: "other",
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
