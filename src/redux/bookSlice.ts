import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { BookDetailsType } from "../containers/book-details/book-details.types";
import { apiKey, itemsPerPage } from "../containers/constants";
import { BookElementType } from "../containers/home/home.types";

export const fetchBook = createAsyncThunk(
  "book/fetchBook",
  async (bookId: string) => {
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

    return parsedData;
  }
);

export const searchBooks = createAsyncThunk(
  "book/searchBooks",
  async ({ searchString, index }: { searchString: string; index: string }) => {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchString}&maxResults=${itemsPerPage}&startIndex=${index}&key=${apiKey}`
    );
    const data = await res.json();
    const items = data.items ?? [];
    const totalItems = data.totalItems;
    const parsedData: BookElementType[] = items.map((book: any) => {
      return {
        id: book.id,
        title: book.volumeInfo.title,
        coverURL: book.volumeInfo.imageLinks?.smallThumbnail,
      };
    });
    return { parsedData, totalItems };
  }
);

export const saveToLocalStorage = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("persistedState", serializedState);
  } catch (e) {
    console.warn(e);
  }
};

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("persistedState");
    if (!serializedState) return;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn(e);
    return;
  }
};

const bookSlice = createSlice({
  name: "book",
  initialState: {
    singleBookData: null as BookDetailsType | null,
    searchResults: [] as BookElementType[],
    searchTerm: "",
    totalItems: 0,
    status: "idle",
    error: undefined as string | undefined,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.singleBookData = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload.parsedData;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = bookSlice.actions;

export default bookSlice.reducer;
