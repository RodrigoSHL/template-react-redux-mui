import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function BasicTextFields() {
  return (
    <Box component="form" autoComplete="off">
      <TextField
        id="standard-basic"
        label="Search pokemons..."
        variant="standard"
      />
      <IconButton type="submit" aria-label="delete" size="large" sx={{ mt: 1 }}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
