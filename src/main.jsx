import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./contexts/AppContext.jsx";
import { QuestionsProvider } from "./contexts/QuestionsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <QuestionsProvider>
        <App />
      </QuestionsProvider>
    </AppProvider>
  </StrictMode>
);
