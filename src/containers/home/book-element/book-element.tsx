import React from "react";

import styles from "./book-element.module.css";

type BookElementProps = {
  id: string;
  title: string;
  coverURL: string;
  onClick: (id: string) => void;
};

export const BookElement: React.FC<BookElementProps> = ({
  id,
  title,
  coverURL,
  onClick,
}) => {
  const handleClick = () => onClick(id);

  return (
    <div className={styles.container} onClick={handleClick}>
      <img className={styles.cover} src={coverURL} alt={title} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};
