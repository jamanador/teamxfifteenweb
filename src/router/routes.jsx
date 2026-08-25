import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home/Home";
import EventsPage from "../pages/Events/EventsPage";
import SeminarsPage from "../pages/Seminars/SeminarsPage";
import WorkshopsPage from "../pages/Workshops/WorkshopsPage";
import EventDetailsPage from "../pages/EventDetails/EventDetailsPage";
import NotFound from "../pages/ErrorPage/NotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path: "/seminars",
        element: <SeminarsPage />,
      },
      {
        path: "/workshops",
        element: <WorkshopsPage />,
      },
      {
        path: "/events/:id",
        element: <EventDetailsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
