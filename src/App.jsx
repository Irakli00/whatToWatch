import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/layout/AppLayout";
import Hero from "./pages/Hero";
import MediaSelection from "./pages/MediaSelection";
import MovieRecomendations from "./pages/MovieRecomendations";
import AnimeRecomendations from "./pages/AnimeRecomendations";
import AnimeDetails from "./pages/AnimeDetails";
import MovieDetails from "./pages/MovieDetails";

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
          <MediaSelection
            type={"movie"}
            questionsType="movieQs"
          ></MediaSelection>
        ),
      },
      {
        path: "/recomendations/movies",
        element: <MovieRecomendations></MovieRecomendations>,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails></MovieDetails>,
      },
      {
        path: "/selectAnimes",
        element: (
          <MediaSelection
            type={"anime"}
            questionsType="animeQs"
          ></MediaSelection>
        ),
      },
      {
        path: "/recomendations/animes",
        element: <AnimeRecomendations></AnimeRecomendations>,
      },
      {
        path: "/anime/:id",
        element: <AnimeDetails></AnimeDetails>,
      },
      { path: "/TVs", element: "" },
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
