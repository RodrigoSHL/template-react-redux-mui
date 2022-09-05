import { AlertColor } from "@mui/material";

export interface ISnackbar {
    isOpen: boolean;
    message?: string;
    severity?: AlertColor | undefined;
    timeOut?: number;
  }