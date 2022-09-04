import React, { useEffect, useState } from "react";
import { DataGrid, GridValueGetterParams, esES } from "@mui/x-data-grid";
import { Box, IconButton, Stack, Typography } from "@mui/material";
//Slice
import styles from "../Crud.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { findAll, remove, selectCrud } from "../../../features/crud/crudSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalPokemon from "./Modal";

export interface IPokemon {
  _id: string;
  name: string;
  no: number;
}

const Table = () => {
  const dispatch = useAppDispatch();
  //Store
  const { results: POKEMONS } = useAppSelector(selectCrud);
  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  useEffect(() => {
    setPokemonList(POKEMONS);
  }, [POKEMONS]);

  const deletePokemonButton = (id: string) => {
    dispatch(remove(id))
      .then((response: any) => {
        const remainingArr = pokemonList.filter((data) => data._id !== id);
        setPokemonList(remainingArr);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderDetailsButton = (params: any) => {
    return (
      <strong>
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            color="primary"
            style={{ marginLeft: 16 }}
            onClick={() => {
              console.log(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="warning"
            style={{ marginLeft: 16 }}
            onClick={() => deletePokemonButton(params.row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </strong>
    );
  };
  const columns = [
    {
      field: "no",
      headerName: "N° Pokemon",
      flex: 1,
      minWidth: 100,
      disableClickEventBubbling: true,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 100,
      valueGetter: (params: GridValueGetterParams) =>
        params.row.name.toUpperCase(),
      disableClickEventBubbling: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: renderDetailsButton,
      disableClickEventBubbling: true,
    },
  ];
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Pokemon's
        </Typography>
        <ModalPokemon pokemonList={pokemonList} setPokemonList={setPokemonList}/>
      </Box>
      <Box style={{ height: "60vh", width: "100%" }}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          getRowId={(row: any) => row._id}
          rows={pokemonList}
          columns={columns}
        />
      </Box>
    </>
  );
};
export default Table;
