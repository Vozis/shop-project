import * as React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Home, { pizzasLoader } from "../pages/Home";
// import Error from "../pages/ErrorPage";
import Layout from "../components/Layout";
// import Cart from "../pages/Cart";
// import FullPizza from "../pages/FullPizza";

const Cart = React.lazy(() => import("../pages/Cart"));
const FullPizza = React.lazy(() => import("../pages/FullPizza"));
const Error = React.lazy(() => import("../pages/ErrorPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: rootLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        // path: "home",
        element: <Home />,
        // loader: pizzasLoader,
        errorElement: (
          <div>
            <b>Возникла ошибка при загрузке данных</b>
          </div>
        ),
      },
      {
        path: "pizza/:id",
        element: (
          <>
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <FullPizza />
            </React.Suspense>
          </>
        ),
        errorElement: <Error />,
      },
      {
        path: "cart",
        element: (
          <>
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Cart />
            </React.Suspense>
          </>
        ),
        // loader: pizzasLoader,
        errorElement: (
          <>
            <React.Suspense fallback={<div>Загрузка...</div>}>
              <Error />
            </React.Suspense>
          </>
        ),
      },
    ],
  },
]);
