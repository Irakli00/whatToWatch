import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Hero from "./pages/Hero";
import MediaSelection from "./pages/MediaSelection";
import MovieRecomendations from "./pages/MovieRecomendations";
import AnimeRecomendations from "./pages/AnimeRecomendations";
import AnimeDetails from "./pages/AnimeDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 9999 * 9999,
      // staleTime: 10,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      { index: true, element: <Hero /> },
      {
        path: "/selectMovies",
        element: (
          <MediaSelection questionsType="movieQuestions"></MediaSelection>
        ),
      },
      {
        path: "/selectAnimes",
        element: (
          <MediaSelection questionsType="animeQuestions"></MediaSelection>
        ),
      },
      {
        path: "/anime/:id",
        element: <AnimeDetails></AnimeDetails>,
      },
      { path: "/TVs", element: "" },
      {
        path: "/recomendations/animes",
        element: <AnimeRecomendations></AnimeRecomendations>,
      },
      {
        path: "/recomendations/movies",
        element: <MovieRecomendations></MovieRecomendations>,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
