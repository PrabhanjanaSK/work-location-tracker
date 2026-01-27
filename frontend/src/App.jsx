import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const AppLayout = lazy(() => import("./ui/AppLayout"));
const Analytics = lazy(() => import("./features/analytics/Analytics"));
const Login = lazy(() => import("./features/auth/Login"));
const Calendar = lazy(() => import("./features/calendar/Calendar"));
const Home = lazy(() => import("./ui/Home"));
const Profile = lazy(() => import("./features/profile/Profile"));

import { analyticsLoader } from "./features/analytics/analytics.loader";
import { loginAction } from "./features/auth/action";
import { requireAuthLoader } from "./features/auth/requireAuth.loader";
import { calendarLoader } from "./features/calendar/calendar.loader";
import { profileLoader } from "./features/profile/profile.loader";

import ErrorPage from "./ui/Error";

import "./styles/globals.css";
import "./styles/reset.css";
import "./styles/variables.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    action: loginAction,
    errorElement: <ErrorPage />,
  },

  {
    id: "root",
    element: <AppLayout />,
    loader: requireAuthLoader,
    shouldRevalidate: () => false,
    children: [
      {
        path: "/",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
        errorElement: <ErrorPage />,
      },

      {
        path: "/analytics",
        element: (
          <Suspense>
            <Analytics />
          </Suspense>
        ),
        loader: analyticsLoader,
        errorElement: <ErrorPage />,
      },

      {
        path: "/work-locations",
        element: (
          <Suspense>
            <Calendar />
          </Suspense>
        ),
        loader: calendarLoader,
        errorElement: <ErrorPage />,
      },

      {
        path: "/profile",
        element: (
          <Suspense>
            <Profile />
          </Suspense>
        ),
        loader: profileLoader,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
