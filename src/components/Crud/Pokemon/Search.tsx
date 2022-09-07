import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../app/hooks";
import { findAll, findOne } from "../../../features/crud/crudSlice";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const [searchParam, setSearchParam] = React.useState<any>();
  const addDataInMemory = (e: any) => {
    const { name, value } = e.target;
    setSearchParam((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    if (searchParam.search !== '') {
      dispatch(findOne(searchParam));
    } else {
      dispatch(findAll())
    }
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={submitForm}>
      <TextField
        name="search"
        id="standard-basic"
        label="Search pokemons..."
        variant="standard"
        sx={{ width: "35ch" }}
        onChange={addDataInMemory}
      />
      <IconButton type="submit" aria-label="delete" size="large" sx={{ mt: 1 }}>
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
}
