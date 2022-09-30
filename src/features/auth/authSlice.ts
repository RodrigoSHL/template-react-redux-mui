import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateAuth } from "../../app/initialVariable";
import { RootState } from "../../app/store";

//Auth slice for redux-toolkit bases
import { types } from "../../app/types";

export const authSlice = createSlice({
  name: types.authType,
  initialState: { ...initialStateAuth },
  reducers: {
    onChecking: (state: any = initialStateAuth) => {
      state.status = "checking"; //'authenticated' - 'not-authenticated'
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state: any = initialStateAuth, action: PayloadAction<any>) => {
      state.status = "authenticated"; //'authenticated' - 'not-authenticated'
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state: any = initialStateAuth, action: PayloadAction<any>) => {
      state.status = "not-authenticated"; //'authenticated' - 'not-authenticated'
      state.user = {};
      state.errorMessage = action.payload;
      state.isAdmin = false;
    },
    clearErrorMessage: (state: any = initialStateAuth) => {
      state.errorMessage = undefined;
    },
    onCheckAdmin: (state: any = initialStateAuth, action: PayloadAction<any>) => {
      state.isAdmin = action.payload;
    }
    },
});

// ACTION
export const { onCheckAdmin, onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;

// STATE-REDUCER
export const selectAuth = (state: RootState) => state.auth;

// REDUCER
export default authSlice.reducer;
