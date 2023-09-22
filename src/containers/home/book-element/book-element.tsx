import React from "react";

import styles from "./book-element.module.css";

type BookElementProps = {
  title: string;
  coverURL: string;
};

export const BookElement: React.FC<BookElementProps> = ({
  title,
  coverURL,
}) => {
  return (
    <div className={styles.container}>
      <img className={styles.cover} src={coverURL} alt={title} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
