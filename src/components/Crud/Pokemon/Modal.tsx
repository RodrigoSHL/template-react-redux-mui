import { Button, Modal, Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useAppDispatch } from "../../../app/hooks";
import { create, findAll } from "../../../features/crud/crudSlice";
import { IPokemonCreate } from "../../../interfaces/IPokemonCreate.interface";

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

const ModalPokemon = () => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pokemon, setPokemon] = useState<IPokemonCreate>({
    name: "",
    no: 1,
  });

  const addDataInMemory = (e: any) => {
    const { name, value } = e.target;
    setPokemon((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    dispatch(create(pokemon))
      .then((response) => {
        dispatch(findAll())
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <>
      <Button onClick={handleOpen} color="secondary" startIcon={<AddBoxIcon />}>
        New
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            New Pokemon
          </Typography>
          <Box component="form" onSubmit={submitForm} noValidate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="outlined-basic"
                  label="Ingresar nombre de pokemon"
                  variant="outlined"
                  fullWidth
                  required
                  name="name"
                  onChange={addDataInMemory}
                  value={pokemon.name}
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
                  value={pokemon.no}
                  InputProps={{
                    inputProps: {
                      max: 5000,
                      min: 1,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  Save
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  onClick={handleClose}
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
