import { RootState } from "./redux";

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
