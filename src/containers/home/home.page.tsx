import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Pagination } from "@mui/material";

import { BookElement } from "./book-element";
import { useDebounce } from "./home.utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { searchBooks, setSearchTerm } from "../../redux";

import styles from "./home.page.module.css";
import { itemsPerPage } from "../constants";

export const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [booksAvailable, setBooksAvailable] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedValue = useDebounce(searchValue, 300);
  const { searchResults, status, totalItems } = useAppSelector(
    (state) => state.book
  );

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleBookClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(setSearchTerm(searchValue));

    const startingIndex = (currentPage - 1) * itemsPerPage;
    dispatch(
      searchBooks({
        searchString: searchValue ? searchValue : "a",
        index: startingIndex.toString(),
      })
    );
  }, [debouncedValue, currentPage]);

  useEffect(() => {
    setBooksAvailable(!!searchResults.length);
  }, [searchResults]);

  return (
    <div className={styles.container}>
      <TextField
        label="Search"
        placeholder="Search book"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {status === "loading" && <div>Loading...</div>}
      {status === "succeeded" && !booksAvailable && <div>No books found</div>}
      {status === "failed" && <div>There was an error loading books</div>}
      {status === "succeeded" && booksAvailable && (
        <div className={styles.bookList}>
          {searchResults.map((book) => {
            return (
              <BookElement
                key={book.id}
                id={book.id}
                title={book.title}
                coverURL={book.coverURL}
                onClick={handleBookClick}
              />
            );
          })}
        </div>
      )}
      {totalItems > itemsPerPage + 1 && (
        <Pagination
          className={styles.pagination}
          shape="rounded"
          page={currentPage}
          //Note: count should be Math.ceil(totalItems / itemsPerPage), but api keeps returning
          //increasing totalItems with each pagination step and then stops at 20
          count={19}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};
