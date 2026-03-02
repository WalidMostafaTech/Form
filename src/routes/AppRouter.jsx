import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import App from "../App";
import LoadingPage from "../components/Loading/LoadingPage";
import ProtectedRoute from "@/components/protectRoutes/ProtectedRoute";
import AuthGuard from "@/components/protectRoutes/AuthGuard";
import VerifyEmailGuard from "@/components/protectRoutes/VerifyEmailGuard";
import CheckVerifiedEmailGuard from "@/components/protectRoutes/CheckVerifiedEmailGuard";

const Home = React.lazy(() => import("../pages/Home/Home"));
const About = React.lazy(() => import("../pages/About/About"));
const Location = React.lazy(() => import("../pages/Location/Location"));
const Shop = React.lazy(() => import("../pages/Shop/Shop"));
const Product = React.lazy(() => import("../pages/Product/Product"));
const ContactUS = React.lazy(() => import("../pages/ContactUS/ContactUS"));

const Cart = React.lazy(() => import("../pages/Cart/Cart"));

const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Account = React.lazy(
  () => import("../pages/Profile/pages/Account/Account"),
);
const Orders = React.lazy(() => import("../pages/Profile/pages/Orders/Orders"));
const Notifications = React.lazy(
  () => import("../pages/Profile/pages/Notifications/Notifications"),
);

const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const RegisterCompany = React.lazy(
  () => import("../pages/Register/RegisterCompany/RegisterCompany"),
);
const RegisterCustomer = React.lazy(
  () => import("../pages/Register/RegisterCustomer/RegisterCustomer"),
);
const VerifyEmail = React.lazy(
  () => import("../pages/VerifyEmail/VerifyEmail"),
);
const ForgotPassword = React.lazy(
  () => import("../pages/ForgotPassword/ForgotPassword"),
);

const NotFound = React.lazy(() => import("../pages/NotFound/NotFound"));
const ErrorPage = React.lazy(() => import("../pages/ErrorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/location", element: <Location /> },
      { path: "/shop", element: <Shop /> },
      { path: "/product/:id", element: <Product /> },
      { path: "/contact", element: <ContactUS /> },

      { path: "/cart", element: <Cart /> },

      {
        path: "/profile",
        element: <Profile />,
        children: [
          { index: true, element: <Account /> },
          { path: "orders", element: <Orders /> },
          { path: "notifications", element: <Notifications /> },
        ],
      },

      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/register/company", element: <RegisterCompany /> },
      { path: "/register/customer", element: <RegisterCustomer /> },
      { path: "/verify-email", element: <VerifyEmail /> },
      { path: "/forgot-password", element: <ForgotPassword /> },

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
