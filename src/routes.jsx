import React from "react";
import App from "./App.jsx";
import AppEn from "./components/AppEn.jsx";
import AppEs from "./components/AppEs.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

export const routes = [
  { path: "/", element: <AppEs /> }, // Default language (Spanish)
  { path: "/en", element: <AppEn /> }, // English version
  { path: "/projects/:projectSlug", element: <ProjectDetail /> }, // Default language projects (Spanish)
  { path: "/en/projects/:projectSlug", element: <ProjectDetail /> }, // English projects
];
