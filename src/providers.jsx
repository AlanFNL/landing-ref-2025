import React, { StrictMode, createContext, useMemo, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from "./Translations/es/global.json";
import global_en from "./Translations/en/global.json";

// Scroll context to share scrollToSection function across components
export const ScrollContext = createContext({
  scrollToSection: (/* targetName, viewOptions, openPopup */) => {},
  setScrollFunction: (/* fn */) => {},
});

// Initialize i18n once for both client and server
if (!i18next.isInitialized) {
  i18next.init({
    interpolation: { escapeValue: false },
    lng: "en",
    fallbackLng: "en",
    supportedLngs: ["en", "es"],
    preload: ["en"],
    react: { useSuspense: false },
    resources: {
      es: { global: global_es },
      en: { global: global_en },
    },
  });
}

export const AppProviders = ({ children }) => {
  const isServer = typeof window === "undefined";
  const [scrollFunctionInState, setScrollFunctionInState] = useState(
    () => () => {}
  );

  const contextValue = useMemo(
    () => ({
      scrollToSection: scrollFunctionInState,
      setScrollFunction: setScrollFunctionInState,
    }),
    [scrollFunctionInState]
  );

  return (
    <StrictMode>
      <I18nextProvider i18n={i18next}>
        {isServer && <style>{`:root { --reduced-motion: 1 }`}</style>}
        <ScrollContext.Provider value={contextValue}>
          {!isServer && <Analytics />}
          {children}
        </ScrollContext.Provider>
      </I18nextProvider>
    </StrictMode>
  );
};
