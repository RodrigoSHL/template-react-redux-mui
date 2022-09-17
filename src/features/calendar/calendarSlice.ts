import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateCalendar } from "../../app/initialVariable";
import { RootState } from "../../app/store";

//Calendar slice for redux-toolkit bases
import { types } from "../../app/types";

export const calendarSlice = createSlice({
  name: types.calendarType,
  initialState: { ...initialStateCalendar },
  reducers: {
    onSetActiveEvent: (
      state: any = initialStateCalendar,
      action: PayloadAction<any>
    ) => {
      state.activeEvent = action.payload;
    },
    onAddNewEvent: (
      state: any = initialStateCalendar,
      action: PayloadAction<any>
    ) => {
      state.events.push(action.payload);
      state.activeEvent = action.payload;
    },
    onUpdateNewEvent: (
      state: any = initialStateCalendar,
      { payload }: PayloadAction<any>
    ) => {
      state.events = state.events.map((event: any) => {
        if (event._id === payload._id) {
          return payload;
        }
        return event;
      });
    },
    onChangeStart: (
      state: any = initialStateCalendar,
      { payload }: PayloadAction<any>
    ) => {
      state.activeEvent.start = payload.start;
    },
    onChangeEnd: (
      state: any = initialStateCalendar,
      { payload }: PayloadAction<any>
    ) => {
      state.activeEvent.end = payload.end;
    },
  },
});

// ACTION
export const { onSetActiveEvent, onAddNewEvent, onUpdateNewEvent, onChangeStart, onChangeEnd } =
  calendarSlice.actions;

// STATE-REDUCER
export const selectCalendar = (state: RootState) => state.calendar;

// REDUCER
export default calendarSlice.reducer;