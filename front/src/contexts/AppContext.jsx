import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [clientMoviePreferences, setClientMoviePreferences] = useState({
    mediaType: null,
    genres: null,
    language: null,
    rating: 0,
    releaseDate: null,
    certifications: null,
    // genres,
    // language
    region: null,
    sort: null,
    page: 0,
  });

  const [clientAnimePreferences, setClientAnimePreferences] = useState({
    mediaType: "anime",
    genres: ["1", "2"],
    rating: "7",
    releaseDate: "2000..",
    // season: null,
    status: null,
    subtype: "TV",
    sort: null,
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
