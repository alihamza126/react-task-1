import { configureStore } from "@reduxjs/toolkit";
import reducer from "./Slice";

const persistedState = localStorage.getItem("reduxState")
   ? JSON.parse(localStorage.getItem("reduxState"))
   : {};

   
export const store = configureStore({
   reducer: {
      invoice: reducer,
   },
   preloadedState: persistedState,
});

store.subscribe(() => {
   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
