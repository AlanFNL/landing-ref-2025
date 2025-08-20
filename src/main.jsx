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
import { Analytics } from "@vercel/analytics/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail.jsx";
import { routes } from "./routes.jsx";
import LanguageWrapper from "./components/LanguageWrapper.jsx";

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

// i18n moved to providers.jsx for SSR/SSG compatibility

// Create router with route-specific elements
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppWrapper>
      <Analytics />
      <RouterProvider router={router} />
    </AppWrapper>
  </StrictMode>
);
