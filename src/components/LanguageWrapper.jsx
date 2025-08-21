import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const LanguageWrapper = ({ children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Handle client-side initialization
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Extract language from URL path
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const urlLanguage = pathSegments[0];

    // Check if URL has a valid language
    if (urlLanguage && ["en"].includes(urlLanguage)) {
      // Set language based on URL (English)
      if (i18n.language !== urlLanguage) {
        i18n.changeLanguage(urlLanguage);
      }
      setIsInitialized(true);
    } else {
      // No language in URL or root path = Spanish (default)
      if (i18n.language !== "es") {
        i18n.changeLanguage("es");
      }
      setIsInitialized(true);
    }
  }, [location.pathname, i18n]);

  // Don't render children until language is initialized
  if (!isInitialized) {
    return null;
  }

  return children;
};

export default LanguageWrapper;
