import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const SEOHead = () => {
  const location = useLocation();

  // Extract language from URL path - more robust handling
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentLanguage =
    pathSegments[0] && ["en", "es"].includes(pathSegments[0])
      ? pathSegments[0]
      : "en";

  // Base URL for your site - UPDATE THIS WITH YOUR ACTUAL DOMAIN
  const baseUrl = "https://reforceinfinity.com"; // Replace with your actual domain

  // Current page URL
  const currentUrl = `${baseUrl}${location.pathname}`;

  // Language-specific URLs
  const enUrl = `${baseUrl}/en${
    location.pathname.startsWith("/en")
      ? location.pathname.substring(3)
      : location.pathname
  }`;
  const esUrl = `${baseUrl}/es${
    location.pathname.startsWith("/es")
      ? location.pathname.substring(3)
      : location.pathname
  }`;

  // Default language URL (root)
  const defaultUrl = `${baseUrl}${
    location.pathname.startsWith("/en")
      ? location.pathname.substring(3)
      : location.pathname.startsWith("/es")
      ? location.pathname.substring(3)
      : location.pathname
  }`;

  useEffect(() => {
    // Set document language attribute
    document.documentElement.lang = currentLanguage;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      if (currentLanguage === "es") {
        metaDescription.setAttribute(
          "content",
          "Agencia de marketing digital líder impulsada por IA, especializada en desarrollo web, marketing de contenidos y publicidad de medios pagos. Transformamos negocios a través de estrategias basadas en datos y soluciones digitales innovadoras."
        );
      } else {
        metaDescription.setAttribute(
          "content",
          "Leading AI-powered digital marketing agency specializing in web development, content marketing, and paid media advertising. We transform businesses through data-driven strategies and innovative digital solutions."
        );
      }
    }

    // Update Open Graph description
    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      if (currentLanguage === "es") {
        ogDescription.setAttribute(
          "content",
          "Reforce Infinity es una agencia de marketing digital líder impulsada por IA, especializada en desarrollo web, marketing de contenidos y publicidad de medios pagos. Transformamos negocios a través de estrategias basadas en datos y soluciones digitales innovadoras."
        );
      } else {
        ogDescription.setAttribute(
          "content",
          "Reforce Infinity is a leading AI-powered digital marketing agency specializing in web development, content marketing, and paid media advertising. We transform businesses through data-driven strategies and innovative digital solutions."
        );
      }
    }

    // Update Twitter description
    const twitterDescription = document.querySelector(
      'meta[property="twitter:description"]'
    );
    if (twitterDescription) {
      if (currentLanguage === "es") {
        twitterDescription.setAttribute(
          "content",
          "Reforce Infinity es una agencia de marketing digital líder impulsada por IA, especializada en desarrollo web, marketing de contenidos y publicidad de medios pagos. Transformamos negocios a través de estrategias basadas en datos y soluciones digitales innovadoras."
        );
      } else {
        twitterDescription.setAttribute(
          "content",
          "Reforce Infinity is a leading AI-powered digital marketing agency specializing in web development, content marketing, and paid media advertising. We transform businesses through data-driven strategies and innovative digital solutions."
        );
      }
    }

    // Add hreflang links if they don't exist
    const existingHreflang = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    );
    if (existingHreflang.length === 0) {
      const head = document.head;

      // Remove any existing hreflang links
      const oldHreflang = document.querySelectorAll(
        'link[rel="alternate"][hreflang]'
      );
      oldHreflang.forEach((link) => link.remove());

      // Add new hreflang links
      const enLink = document.createElement("link");
      enLink.rel = "alternate";
      enLink.hreflang = "en";
      enLink.href = enUrl;
      head.appendChild(enLink);

      const esLink = document.createElement("link");
      esLink.rel = "alternate";
      esLink.hreflang = "es";
      esLink.href = esUrl;
      head.appendChild(esLink);

      const defaultLink = document.createElement("link");
      defaultLink.rel = "alternate";
      defaultLink.hreflang = "x-default";
      defaultLink.href = defaultUrl;
      head.appendChild(defaultLink);
    }

    // Update canonical URL
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = currentUrl;
    } else {
      const head = document.head;
      const newCanonical = document.createElement("link");
      newCanonical.rel = "canonical";
      newCanonical.href = currentUrl;
      head.appendChild(newCanonical);
    }
  }, [currentLanguage, currentUrl, enUrl, esUrl, defaultUrl]);

  // This component doesn't render anything visible
  return null;
};

export default SEOHead;
