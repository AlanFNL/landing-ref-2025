import { StrictMode, createContext, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import global_es from "./Translations/es/global.json";
import global_en from "./Translations/en/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail.jsx";

// Create context for sharing scrollToSection function
export const ScrollContext = createContext(null);

// Wrapper component to provide context
const AppWrapper = ({ children }) => {
  const [scrollFunction, setScrollFunction] = useState(null);

  return (
    <ScrollContext.Provider
      value={{ scrollToSection: scrollFunction, setScrollFunction }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

// Original console warning function
const originalConsoleWarn = console.warn;

// Filter out blur-related warnings
console.warn = function filterWarnings(msg, ...args) {
  if (
    !msg.match(
      /Invalid keyframe value for property filter: blur\(-\d+\.?\d*px\)/
    )
  ) {
    originalConsoleWarn(msg, ...args);
  }
};

// Suppress React DevTools console.log
const originalConsoleLog = console.log;
console.log = function filterLogs(msg, ...args) {
  if (typeof msg === "string" && msg.includes("blur")) {
    return;
  }
  originalConsoleLog(msg, ...args);
};

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    es: {
      global: global_es,
    },
    en: {
      global: global_en,
    },
  },
});

// Create router with route-specific elements
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects/:projectSlug",
    element: <ProjectDetail />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <I18nextProvider i18n={i18next}>
      <AppWrapper>
        <RouterProvider router={router} />
      </AppWrapper>
    </I18nextProvider>
  </StrictMode>
);
