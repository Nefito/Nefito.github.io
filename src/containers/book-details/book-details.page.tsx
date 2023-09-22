import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { BookDetailsType } from "./book-details.types";
import { apiKey } from "../constants";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import styles from "./book-details.page.module.css";

export const BookDetailsPage = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const bookId = pathname.split("/")[2];

  const [bookData, setBookData] = useState<BookDetailsType>(
    {} as BookDetailsType
  );
  const [loading, setLoading] = useState(false);

  const handleBackClick = () => navigate(-1);

  const loadBook = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`
      );
      const data = await res.json();
      const parsedData: BookDetailsType = {
        title: data.volumeInfo.title,
        description: data.volumeInfo.description,
        coverURL: data.volumeInfo?.imageLinks.medium,
        publishDate: data.volumeInfo.publishedDate,
        authors: data.volumeInfo.authors,
      };

      setBookData(parsedData);
    } catch (e) {
      console.error("Error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <div className={styles.container}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
      >
        Back
      </Button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.bookDetailsContainer}>
          <div className={styles.coverContainer}>
            <img src={bookData.coverURL} alt={bookData.title} />
          </div>
          <div className={styles.bookInfoContainer}>
            <div>Author(s): {bookData.authors?.join(", ")}</div>
            <div>
              Title: <strong>{bookData.title}</strong>
            </div>
            <div>
              Publish date:{" "}
              {bookData.publishDate
                ? new Date(bookData.publishDate).toDateString()
                : "No date available"}
            </div>
            {bookData.description && (
              <div>Description: {bookData.description}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
