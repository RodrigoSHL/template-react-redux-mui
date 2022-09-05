import { Button, Modal, Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  create,
  findAll,
  selectCrud,
  update,
} from "../../../features/crud/crudSlice";
import { IPokemonCreate } from "../../../interfaces/IPokemon.interface";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalPokemon = ({
  updateState,
  setUpdateState,
  openModal,
  handleOpenModal,
  handleCloseModal,
}: any) => {
  const dispatch = useAppDispatch();
  const { pokemon: POKEMON }: any = useAppSelector(selectCrud);

  const [pokemonObject, setPokemonObject] = useState<IPokemonCreate>({
    name: "",
    no: 1,
  });

  const addDataInMemory = (e: any) => {
    const { name, value } = e.target;
    setPokemonObject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    if (updateState) {
      dispatch(update(pokemonObject, POKEMON._id))
        .then((response) => {
          dispatch(findAll());
          handleCloseModal();
        })
        .catch((error) => console.log("error", error));
    } else {
      dispatch(create(pokemonObject))
        .then((response) => {
          dispatch(findAll());
        })
        .catch((error) => console.log("error", error));
    }
  };

  useEffect(() => {
    setPokemonObject(POKEMON);
  }, [POKEMON]);

  const newPokemonButton = (e: any) => {
    e.preventDefault();
    setPokemonObject({ name: "", no: 1 });
    handleOpenModal();
    setUpdateState(false);
  };
  return (
    <>
      <Button
        onClick={(e: any) => newPokemonButton(e)}
        color="secondary"
        startIcon={<AddBoxIcon />}
      >
        New
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            { updateState ? 'Update Pokemon' : 'New Pokemon'}
          </Typography>
          <Box component="form" onSubmit={submitForm} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar nombre de pokemon"
                  variant="outlined"
                  fullWidth
                  name="name"
                  onChange={addDataInMemory}
                  value={pokemonObject.name}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="number"
                  id="outlined-basic"
                  label="Ingresar numero de pokemon"
                  variant="outlined"
                  fullWidth
                  required
                  name="no"
                  onChange={addDataInMemory}
                  value={pokemonObject.no}
                  InputProps={{
                    inputProps: {
                      max: 5000,
                      min: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {updateState ? (
                  <Button
                    type="submit"
                    color="warning"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 2 }}
                  >
                    Save
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ModalPokemon;
