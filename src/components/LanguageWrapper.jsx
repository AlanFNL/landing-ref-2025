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
    if (urlLanguage && ["en", "es"].includes(urlLanguage)) {
      // Set language based on URL
      if (i18n.language !== urlLanguage) {
        i18n.changeLanguage(urlLanguage);
      }
      setIsInitialized(true);
    } else {
      // No language in URL, redirect to default language
      const defaultLanguage = getDefaultLanguage();
      navigate(`/${defaultLanguage}`, { replace: true });
    }
  }, [location.pathname, i18n, navigate]);

  // Get default language based on browser preference or fallback to English
  const getDefaultLanguage = () => {
    if (isClient) {
      const browserLang = navigator.language;
      if (browserLang && browserLang.startsWith("es")) {
        return "es";
      }
    }
    return "en";
  };

  // Don't render children until language is initialized
  if (!isInitialized) {
    return null;
  }

  return children;
};

export default LanguageWrapper;
