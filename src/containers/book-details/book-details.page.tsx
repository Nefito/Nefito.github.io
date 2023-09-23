import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchBook } from "../../redux";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./book-details.page.module.css";

export const BookDetailsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bookId = pathname.split("/")[2];

  const { singleBookData, status } = useAppSelector((state) => state.book);

  const handleBackClick = () => navigate(-1);

  useEffect(() => {
    dispatch(fetchBook(bookId));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
      >
        Back
      </Button>
      {status === "loading" && !singleBookData && <div>Loading...</div>}
      {status === "failed" && !singleBookData && (
        <div>Failed to load book details</div>
      )}
      {status === "succeeded" && !!singleBookData && (
        <div className={styles.bookDetailsContainer}>
          <div className={styles.coverContainer}>
            <img src={singleBookData.coverURL} alt={singleBookData.title} />
          </div>
          <div className={styles.bookInfoContainer}>
            <div>Author(s): {singleBookData.authors?.join(", ")}</div>
            <div>
              Title: <strong>{singleBookData.title}</strong>
            </div>
            <div>
              Publish date:{" "}
              {singleBookData.publishDate
                ? new Date(singleBookData.publishDate).toDateString()
                : "No date available"}
            </div>
            {singleBookData.description && (
              <div>Description: {singleBookData.description}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
