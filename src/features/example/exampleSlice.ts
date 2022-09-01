import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  initialStateExample,
} from "../../app/initialVariable";
import { RootState } from "../../app/store";

//Example slice for redux-toolkit bases
import { types } from "../../app/types";

export const exampleSlice = createSlice({
  name: types.exampleType,
  initialState: { ...initialStateExample },
  reducers: {
    getAll: (state: any = initialStateExample, action: PayloadAction<any>) => {
      return { ...state, results: action.payload };
    },
  },
});

// ACTION
export const { getAll } = exampleSlice.actions;

// BUSINESS
export const exampleFetch = () => async (dispatch: any, getState: any) => {
  return true;
};

// STATE-REDUCER
export const selectExample = (state: RootState) => state.example;

// REDUCER
export default exampleSlice.reducer;
