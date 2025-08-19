import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [clientMoviePreferences, setClientMoviePreferences] = useState({
    mediaType: null,
    movieReleaseDate: null,
    genres: null,
    year: null,
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
