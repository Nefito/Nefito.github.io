import { configureStore } from "@reduxjs/toolkit";

import { saveToLocalStorage, loadFromLocalStorage } from "../utils";

import bookReducer from "./bookSlice";

const persistedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    book: bookReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveToLocalStorage(store.getState());
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
