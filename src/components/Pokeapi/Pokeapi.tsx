import React, { useState } from "react";
import {
  Alert,
  AlertProps,
  Box,
  Button,
  Container,
  Snackbar,
  Stack,
} from "@mui/material";
import styles from "./Pokeapi.module.css";

const Pokeapi = () => {
  const [snackbar, setSnackbar] = useState<Pick<AlertProps,"children" | "severity"> | null>(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const openSuccessSnack = () => {
    setSnackbar({
      children: "Success Snackbar",
      severity: "success",
    });
  };

  const openErrorSnack = () => {
    setSnackbar({
      children: "Error Snackbar",
      severity: "error",
    });
  };
  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h1>Pokeapi</h1>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={openSuccessSnack}>
                Success
              </Button>
              <Button variant="contained" onClick={openErrorSnack}>
                Error
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

export default Pokeapi;
