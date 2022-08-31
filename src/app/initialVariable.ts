import { AlertColor } from "@mui/material";

const severityColor:AlertColor = 'warning'

/*Snackbar */
export const initialStateSetSnackbar = {
  isOpen: false,
  message: '',
  severity: severityColor,
  timeOut: 0
}

export const initialStateSnack = {
  dataSnackbar: {...initialStateSetSnackbar}
}

