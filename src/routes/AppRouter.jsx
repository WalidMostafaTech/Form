import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";
import ProtectedRoute from "@/components/protectRoutes/ProtectedRoute";
import AuthGuard from "@/components/protectRoutes/AuthGuard";
import VerifyEmailGuard from "@/components/protectRoutes/VerifyEmailGuard";
import CheckVerifiedEmailGuard from "@/components/protectRoutes/CheckVerifiedEmailGuard";

const Home = React.lazy(() => import("../pages/Home/Home"));

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const ErrorPage = React.lazy(() => import("../pages/ErrorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },

      // {
      //   element: <ProtectedRoute />,
      //   children: [
      //     {
      //       path: "/profile",
      //       element: <Profile />,
      //       children: [
      //         { index: true, element: <Account /> },
      //         { path: "orders", element: <Orders /> },
      //         { path: "notifications", element: <Notifications /> },
      //       ],
      //     },
      //   ],
      // },

      // {
      //   element: <AuthGuard />,
      //   children: [
      //     { path: "/login", element: <Login /> },
      //     { path: "/register", element: <Register /> },
      //     { path: "/forgot-password", element: <ForgotPassword /> },
      //   ],
      // },

      // {
      //   path: "/verify-email",
      //   element: (
      //     <VerifyEmailGuard>
      //       <VerifyEmail />
      //     </VerifyEmailGuard>
      //   ),
      // },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default AppRouter;
