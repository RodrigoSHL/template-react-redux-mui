import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import styles from "./TestComponent.module.css";
import { useAppDispatch } from "../../app/hooks";
import { errorColor, infoColor, successColor, warningColor } from "../Middleware/Snackbar";
import { setOpenSnackbar } from "../../features/snackbar/snackbarSlice";

const TestComponent = () => {
  const dispatch = useAppDispatch();
  const objSuccess = {isOpen: true,message: 'Open Snackbar Success',severity: successColor,timeOut : 2000}
  const objError = {isOpen: true,message: 'Open Snackbar Error',severity: errorColor,timeOut : 2000}
  const objWarning = {isOpen: true,message: 'Open Snackbar Warning',severity: warningColor,timeOut : 2000}
  const objInfo = {isOpen: true,message: 'Open Snackbar Info',severity: infoColor,timeOut : 2000}

  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h1>Testing Snackbar</h1>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" onClick={() => dispatch(setOpenSnackbar(objSuccess))}>
                Success
              </Button>
              <Button variant="contained" color="error" onClick={() => dispatch(setOpenSnackbar(objError))}>
                Error
              </Button>
              <Button variant="contained" color="warning" onClick={() => dispatch(setOpenSnackbar(objWarning))}>
                Warning
              </Button>
              <Button variant="contained" color="info" onClick={() => dispatch(setOpenSnackbar(objInfo))}>
                Info
              </Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" href="#contained-buttons">
                Link
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default TestComponent;
