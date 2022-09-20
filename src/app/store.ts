import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import darkModeReducer from "../features/thematic/darkModeSlice";
import snackbarReducer from "../features/snackbar/snackbarSlice";
import pokeapiReducer from "../features/pokeapi/pokeapiSlice";
import exampleReducer from "../features/example/exampleSlice";
import crudReducer from "../features/crud/crudSlice";
import authReducer from "../features/auth/authSlice";
import calendarReducer from "../features/calendar/calendarSlice";
import uiReducer from "../features/ui/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
    crud: crudReducer,
    darkMode: darkModeReducer,
    example: exampleReducer,
    pokeapi: pokeapiReducer,
    snackbar: snackbarReducer,
    calendar: calendarReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
