import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateCalendar } from "../../app/initialVariable";
import { RootState } from "../../app/store";

//Calendar slice for redux-toolkit bases
import { types } from "../../app/types";

export const calendarSlice = createSlice({
  name: types.calendarType,
  initialState: { ...initialStateCalendar },
  reducers: {
    getAll: (state: any = initialStateCalendar, action: PayloadAction<any>) => {
      return { ...state, results: action.payload };
    },
  },
});

// ACTION
export const { getAll } = calendarSlice.actions;

// BUSINESS
// export const calendarFetch = () => async (dispatch: any, getState: any) => {
//   return true;
// };

// STATE-REDUCER
export const selectCalendar = (state: RootState) => state.calendar;

// REDUCER
export default calendarSlice.reducer;
