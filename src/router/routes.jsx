import React from "react";
import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "../layout/DefaultLayout";
import AdminLayout from "../layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";
import Home from "../pages/Home/Home";
import EventsPage from "../pages/Events/EventsPage";
import SeminarsPage from "../pages/Seminars/SeminarsPage";
import WorkshopsPage from "../pages/Workshops/WorkshopsPage";
import EventDetailsPage from "../pages/EventDetails/EventDetailsPage";
import LoginPage from "../pages/Auth/LoginPage";
import RegisterPage from "../pages/Auth/RegisterPage";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminEventsPage from "../pages/Admin/AdminEventsPage";
import AdminUsersPage from "../pages/Admin/AdminUsersPage";
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
        path: "home",
        element: <Home />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "seminars",
        element: <SeminarsPage />,
      },
      {
        path: "workshops",
        element: <WorkshopsPage />,
      },
      {
        path: "events/:id",
        element: <EventDetailsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "events",
        element: <AdminEventsPage />,
      },
      {
        path: "users",
        element: <AdminUsersPage />,
      },
    ],
  },
]);
