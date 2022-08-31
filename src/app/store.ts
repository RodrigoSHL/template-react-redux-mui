import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import darkModeReducer from "../features/thematic/darkModeSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    darkMode: darkModeReducer,
    snackbar: snackbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
