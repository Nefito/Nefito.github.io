import React from "react";
import { useRouteError } from "react-router-dom";

import styles from "./error.page.module.css";

export const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div className={styles.container}>
      <h1>Something went wrong</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
