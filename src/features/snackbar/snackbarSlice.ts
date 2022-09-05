import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateSnack } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";
import { ISnackbar } from "../../interfaces/ISnackbar.interface";


export const snackbarSlice = createSlice({
  name: types.snackbarType,
  initialState: { ...initialStateSnack },
  reducers: {
    openSnackbar: (state: any = initialStateSnack, action: PayloadAction<ISnackbar>) => {
      //state.isOpen = !state.isOpen;
      state.dataSnackbar = action.payload;
    },
  },
});

export default snackbarSlice.reducer;

export const { openSnackbar } = snackbarSlice.actions;

export const selectSnackbar = (state: RootState) => state.snackbar.dataSnackbar;

export const setOpenSnackbar = (objSettingSnackbar: ISnackbar) => (dispatch: any) => {
  dispatch(openSnackbar(objSettingSnackbar));
};
