import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Calendar from "./Calendar.jsx";

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/calendar",
    element: <Calendar />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
