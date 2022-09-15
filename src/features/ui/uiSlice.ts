import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateUI } from "../../app/initialVariable";
import { RootState } from "../../app/store";

//UI slice for redux-toolkit bases
import { types } from "../../app/types";

export const uiSlice = createSlice({
  name: types.uiType,
  initialState: { ...initialStateUI },
  reducers: {
    onOpenDateModal: (state: any = initialStateUI) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state: any = initialStateUI) => {
      state.isDateModalOpen = false;
    },
  },
});

// ACTION
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;

// BUSINESS
export const uiFetch = () => async (dispatch: any, getState: any) => {
  return true;
};

// STATE-REDUCER
export const selectUI = (state: RootState) => state.ui;

// REDUCER
export default uiSlice.reducer;
