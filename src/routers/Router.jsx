import React, { lazy } from "react";
const DetailsProductPage = lazy(() =>
  import("../pages/DetailsProduct/DetailsProductPage")
);
const NewPassword = lazy(() =>
  import("../pages/ResetPassword/NewPasswordPage")
);
const HomePage = lazy(() => import("../pages/Home/HomePage"));
const PaymentPage = lazy(() => import("../pages/Payment/PaymentPage"));
const UserPage = lazy(() => import("../pages/User/UserPage"));
const ErrorPage = lazy(() => import("../pages/Error/ErrorPage"));
const LoginPage = lazy(() => import("../pages/Login/LoginPage"));
const RegisterPage = lazy(() => import("../pages/Register/RegisterPage"));
const OtpPage = lazy(() => import("../pages/Otp/OtpPage")); // Đúng path rồi
const OtpResetPassword = lazy(() =>
  import("../pages/Otp/OtpResetPasswordPage")
);
const CartPage = lazy(() => import("../pages/Cart/CartPage"));
const HomeAdmin = lazy(() => import("../pages/Admin/AdminPage"));
const ResetPasswordPage = lazy(() =>
  import("../pages/ResetPassword/ResetPasswordPage")
);
const LoginAdminPage = lazy(() =>
  import("../apps/Authentication/Login/LoginAdmin")
);
const AboutPage = lazy(() => import("../pages/About/AboutPage"));
const routes = [
  // userPage
  { path: "/", element: <HomePage /> },
  { path: "/home", element: <HomePage /> },
  { path: "/detail/:id", element: <DetailsProductPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/cart/payment", element: <PaymentPage /> },
  { path: "/user", element: <UserPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/otp", element: <OtpPage /> },
  { path: "/otp/resetpassword", element: <OtpResetPassword /> },
  { path: "/resetpassword", element: <ResetPasswordPage /> },
  { path: "/newpassword", element: <NewPassword /> },
  { path: "/aboutus", element: <AboutPage /> },
  // adminPage

  { path: "/authentication/login/admin/account", element: <LoginAdminPage /> },
  { path: "/admin", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/genre", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/cover", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/gift", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/discount", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/product", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/statis", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/type", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/employees", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/customers", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/order", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/stock", element: <HomeAdmin />, adminRequired: true },
  { path: "/admin/sales", element: <HomeAdmin />, adminRequired: true },
  { path: "*", element: <ErrorPage /> },
];

export default routes;
