import { createSlice } from "@reduxjs/toolkit";
import { initialStatePokeapi } from "../../app/initialVariable";

//Example slice for redux-toolkit bases
import { types } from "../../app/types";

export const themeSlice = createSlice({
  name: types.pokeapiType,
  initialState: {...initialStatePokeapi},
  reducers: {},
});

export default themeSlice.reducer;