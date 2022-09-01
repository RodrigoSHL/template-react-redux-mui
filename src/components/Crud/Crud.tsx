import React from "react";
import {
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material";
import styles from "./Crud.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { findAll, selectCrud } from "../../features/crud/crudSlice";

const Crud = () => {
  const dispatch = useAppDispatch();
  const { results: POKEMONS } = useAppSelector(selectCrud);

  console.log(POKEMONS)


  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h1>Testing</h1>
            <Stack direction="row">
              <Button
                variant="contained"
                color="warning"
                onClick={() => dispatch(findAll())}
              >
                Get Pokemon
              </Button>
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Crud;
