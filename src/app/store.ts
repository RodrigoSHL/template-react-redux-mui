import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import darkModeReducer from "../features/thematic/darkModeSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import pokeapiReducer from "../features/pokeapi/pokeapiSlice";
import exampleReducer from "../features/example/exampleSlice";
import crudReducer from "../features/crud/crudSlice";

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    counter: counterReducer,
    darkMode: darkModeReducer,
    snackbar: snackbarReducer,
    pokeapi: pokeapiReducer,
    crud: crudReducer,
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
