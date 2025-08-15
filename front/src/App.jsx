import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import AppLayout from "./ui/AppLayout";
import Hero from "./pages/Hero";
import MovieSelection from "./pages/MovieSelection";
import Recomendations from "./pages/Recomendations";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      { index: true, element: <Hero /> },
      {
        path: "/movies",
        element: <MovieSelection></MovieSelection>,
      },
      { path: "/anime", element: "" },
      { path: "/TV", element: "" },
      {
        path: "/recomendations",
        element: <Recomendations></Recomendations>,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
