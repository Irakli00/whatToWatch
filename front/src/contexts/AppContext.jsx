import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [clientMoviePreferences, setClientMoviePreferences] = useState({
    mediaType: null,
    genres: null,
    language: null,
    rating: 0,
    region: null,
    releaseDate: null,
  });

  const [clientAnimePreferences, setClientAnimePreferences] = useState({
    mediaType: null,
    genres: null,
  });

  return (
    <AppContext.Provider
      value={{
        clientMoviePreferences,
        setClientMoviePreferences,
        clientAnimePreferences,
        setClientAnimePreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export { AppContext, AppProvider };
