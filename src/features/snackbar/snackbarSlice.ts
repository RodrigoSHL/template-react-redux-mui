import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialStateSnack } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { AlertColor } from "@mui/material";
import { types } from "../../app/types";

export interface ISnackbar {
  isOpen: boolean;
  message?: string;
  severity?: AlertColor | undefined;
  timeOut?: number;
}

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
  console.log('objSettingSnackbar', objSettingSnackbar);
  dispatch(openSnackbar(objSettingSnackbar));
};
