import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

import { BookElement } from "./book-element";
import { BookElementType } from "./home.types";
import { useDebounce } from "./home.utils";
import { apiKey } from "../constants";

import styles from "./home.page.module.css";

export const HomePage = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState<BookElementType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const debouncedValue = useDebounce(searchValue, 300);

  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  const handleBookClick = (id: string) => {
    navigate(`/book/${id}`);
  };

  const loadBooks = async (query = "a") => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=40&key=${apiKey}`
      );
      const data = await res.json();
      const parsedData: BookElementType[] = data.items.map((book: any) => {
        return {
          id: book.id,
          title: book.volumeInfo.title,
          coverURL: book.volumeInfo.imageLinks?.smallThumbnail,
        };
      });
      setBooks(parsedData);
    } catch (e) {
      console.error("Error:", e);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks(searchValue ? searchValue : "a");
  }, [debouncedValue]);

  return (
    <div className={styles.container}>
      <TextField
        label="Search"
        placeholder="Search book"
        value={searchValue}
        onChange={handleSearchChange}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles.bookList}>
          {books.map((book) => {
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
    </div>
  );
};
