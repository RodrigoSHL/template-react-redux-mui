import React from "react";
import {
  Box,
  Container,
  Paper,
} from "@mui/material";
import styles from "./Crud.module.css";
import TabOptions from "./TabOptions";

const Crud = () => {

  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
           <Paper>
            <TabOptions/>
           </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Crud;
