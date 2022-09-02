import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  openSnackbar,
  selectSnackbar,
} from "../../features/snackbar/snackbarSlice";
import { Alert, AlertColor } from "@mui/material";

export const warningColor:AlertColor = 'warning'
export const successColor:AlertColor = 'success'
export const errorColor:AlertColor = 'error'
export const infoColor:AlertColor = 'info'


export default function SimpleSnackbar() {
  const objSnackbar = useAppSelector(selectSnackbar);
  const dispatch = useAppDispatch();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    const objSetting = {
      isOpen: false,
      message: objSnackbar.message,
      severity: objSnackbar.severity,
      timeOut : objSnackbar.timeOut
    }
    dispatch(openSnackbar(objSetting));
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={objSnackbar.isOpen}
        autoHideDuration={objSnackbar.timeOut}
        onClose={handleClose}
        action={action}
      >
        <Alert onClose={handleClose} severity={objSnackbar.severity} sx={{ width: "100%" }}>
        {objSnackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
