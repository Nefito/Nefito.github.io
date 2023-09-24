import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import { BookComponent } from "../../components/book-component/book-component";
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
        <BookComponent {...singleBookData} />
      )}
    </div>
  );
};
