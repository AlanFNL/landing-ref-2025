import React from "react";
import App from "./App.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";

export const routes = [
  { path: "/", element: <App /> },
  { path: "/projects/:projectSlug", element: <ProjectDetail /> },
];
