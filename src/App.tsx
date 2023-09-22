import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { HomePage, ErrorPage, BookDetailsPage } from "./containers";

import styles from "./app.module.css";

export type RouteConfig = {
  path: string;
  component: React.ComponentType<unknown>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "book/:bookId",
    element: <BookDetailsPage />,
  },
]);

export const App = () => {
  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
