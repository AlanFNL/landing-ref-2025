import React from "react";
import App from "./App.jsx";
import AppEn from "./components/AppEn.jsx";
import AppEs from "./components/AppEs.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

export const routes = [
  { path: "/", element: <App /> },
  { path: "/en", element: <AppEn /> },
  { path: "/es", element: <AppEs /> },
  { path: "/en/projects/:projectSlug", element: <ProjectDetail /> },
  { path: "/es/projects/:projectSlug", element: <ProjectDetail /> },
  { path: "/projects/:projectSlug", element: <ProjectDetail /> },
];
