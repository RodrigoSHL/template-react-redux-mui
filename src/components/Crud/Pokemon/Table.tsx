import React, { useEffect, useState } from "react";
import { DataGrid, GridValueGetterParams, esES } from "@mui/x-data-grid";
import { Box, IconButton, Stack, Typography } from "@mui/material";
//Slice
import styles from "../Crud.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  findAll,
  remove,
  selectCrud,
  setInfoUpdated,
} from "../../../features/crud/crudSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ModalPokemon from "./Modal";
import { IPokemonRead } from "../../../interfaces/IPokemon.interface";
import Search from "./Search";

const Table = () => {
  const dispatch = useAppDispatch();
  const { results: POKEMONS } = useAppSelector(selectCrud);
  const [pokemonList, setPokemonList] = useState<IPokemonRead[]>([]);

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

  useEffect(() => {
    setPokemonList(POKEMONS);
  }, [POKEMONS]);

  const deletePokemonButton = (id: string, e: any) => {
    e.preventDefault();
    dispatch(remove(id))
      .then((response: any) => {
        const remainingArr = pokemonList.filter((data) => data._id !== id);
        setPokemonList(remainingArr);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const updatePokemonButton = (objPokemon: any, e: any) => {
    e.preventDefault();
    dispatch(setInfoUpdated(objPokemon));
    handleOpenModal();
    setUpdateState(true);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [updateState, setUpdateState] = useState(false);

  const renderDetailsButton = (params: any) => {
    return (
      <strong>
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="edit"
            color="primary"
            style={{ marginLeft: 16 }}
            onClick={(e: any) => updatePokemonButton(params.row, e)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            style={{ marginLeft: 16 }}
            onClick={(e: any) => deletePokemonButton(params.row._id, e)}
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
    }
  ];

  return (
    <>
      <Box className={styles.toolbar}>
        <Typography variant="h6" component="h2" color="primary">
          Pokemons
        </Typography>
        <ModalPokemon
          updateState={updateState}
          setUpdateState={setUpdateState}
          openModal={openModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      </Box>
      <Box className={styles.search}>
        <Search />
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
