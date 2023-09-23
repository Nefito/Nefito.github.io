import React from "react";

import styles from "./book-details.page.module.css";

type BookComponentProps = {
  title: string;
  coverURL: string;
  authors: string[];
  description?: string;
  publishDate?: string;
};

export const BookComponent: React.FC<BookComponentProps> = ({
  title,
  coverURL,
  authors,
  description,
  publishDate,
}) => {
  return (
    <div className={styles.bookDetailsContainer}>
      <div className={styles.coverContainer}>
        <img src={coverURL} alt={title} />
      </div>
      <div className={styles.bookInfoContainer}>
        <div>Author(s): {authors?.join(", ")}</div>
        <div>
          Title: <strong>{title}</strong>
        </div>
        <div>
          Publish date:{" "}
          {publishDate
            ? new Date(publishDate).toDateString()
            : "No date available"}
        </div>
        {description && <div>Description: {description}</div>}
      </div>
    </div>
  );
};
