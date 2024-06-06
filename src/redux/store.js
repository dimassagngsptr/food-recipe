import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useMemo } from "react";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";

let store;

const rootReducer = combineReducers({
  user: userSlice,
  auth: authSlice,
});

const initStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const initializeStore = (preloadedState) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    store = undefined;
  }

  if (typeof window === "undefined") return _store;
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
