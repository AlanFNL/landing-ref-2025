import React from "react";
import { renderToString } from "react-dom/server";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AppProviders } from "./providers.jsx";
import App from "./App.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

export function render(url) {
  try {
    const html = renderToString(
      <AppProviders>
        <MemoryRouter initialEntries={[url]}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/projects/:projectSlug" element={<ProjectDetail />} />
          </Routes>
        </MemoryRouter>
      </AppProviders>
    );
    return { html };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn("SSR render failed for", url, error);
    return { html: "" };
  }
}
