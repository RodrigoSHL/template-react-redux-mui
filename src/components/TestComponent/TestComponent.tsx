import React from "react";
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
} from "@mui/material";
import styles from "./TestComponent.module.css";

const TestComponent = () => {
  const [snackbar, setSnackbar] = React.useState<Pick<
    AlertProps,
    "children" | "severity"
  > | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const openSuccessSnack = () => {
    setSnackbar({
      children: "Success Snackbar", severity: "success",
    });
  };

  const openErrorSnack = () => {
    setSnackbar({
      children: "Error Snackbar", severity: "error",
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h1>Testing</h1>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="success" onClick={openSuccessSnack}>Success</Button>
              <Button variant="contained" color="error" onClick={openErrorSnack}>Error</Button>
              <Button variant="contained" disabled>
                Disabled
              </Button>
              <Button variant="contained" href="#contained-buttons">
                Link
              </Button>
            </Stack>
          </Box>
        </Box>
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={3000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </Container>
    </>
  );
};

export default TestComponent;
