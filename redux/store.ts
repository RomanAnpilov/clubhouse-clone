import { combineReducers, configureStore, Store } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { roomsReducer } from "./slices/roomSlice";

export const rootReducer = combineReducers({
  rooms: roomsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (): Store =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper<Store>(makeStore, { debug: true });
