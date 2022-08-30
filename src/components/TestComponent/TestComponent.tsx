import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import styles from "./TestComponent.module.css";

const TestComponent = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h1>Hola Mundo</h1>
            <Stack direction="row" spacing={2}>
              <Button variant="contained">Contained</Button>
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
