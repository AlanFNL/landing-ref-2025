import {
  StrictMode,
  createContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import global_es from "./Translations/es/global.json";
import global_en from "./Translations/en/global.json";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail.jsx";
import { Analytics } from "@vercel/analytics/react";

// Define default functions for the context
const defaultScrollToSection = (targetName, viewOptions, openPopup) => {
  console.warn(
    "ScrollContext: scrollToSection called before App initialized or outside provider. Target:",
    targetName
  );
};

const defaultSetScrollFunction = (fn) => {
  console.warn(
    "ScrollContext: setScrollFunction called before App initialized or outside provider. Function:",
    fn
  );
};

// Create context with a default value to prevent null errors
export const ScrollContext = createContext({
  scrollToSection: defaultScrollToSection,
  setScrollFunction: defaultSetScrollFunction,
});

// Wrapper component to provide context
const AppWrapper = ({ children }) => {
  // scrollFunctionInState will hold the actual scrollToSection function registered by App.jsx
  // Initialize it with the default no-op/warning function.
  const [scrollFunctionInState, setScrollFunctionInState] = useState(
    () => defaultScrollToSection
  );

  // Value provided to context consumers
  // setScrollFunction passed to context is the function App.jsx will call to register its own scrollToSection
  const contextValue = useMemo(
    () => ({
      scrollToSection: scrollFunctionInState,
      setScrollFunction: setScrollFunctionInState, // App.jsx will call this with its scrollToSection function
    }),
    [scrollFunctionInState]
  );

  return (
    <ScrollContext.Provider value={contextValue}>
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
        <Analytics />
        <RouterProvider router={router} />
      </AppWrapper>
    </I18nextProvider>
  </StrictMode>
);
