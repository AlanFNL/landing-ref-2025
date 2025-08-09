import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppProviders } from "./providers.jsx";
import { routes } from "./routes.jsx";
import "./index.css";

const router = createBrowserRouter(routes);

const container = document.getElementById("root");

// Hydrate if SSR content exists, otherwise normal mount
if (container && container.hasChildNodes()) {
  hydrateRoot(
    container,
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
} else {
  createRoot(container).render(
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
