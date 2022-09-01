import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateCrud } from "../../app/initialVariable";
import { types } from "../../app/types";

export const crudSlice = createSlice({
  name: types.crudType,
  initialState: {...initialStateCrud},
  reducers: {
    getAll: (state: any = initialStateCrud,action: PayloadAction<any>) => {
        return {...state, ...action.payload}
    },
  },
});

//Action
export const { getAll} = crudSlice.actions;


//Business
export const findAll = () => async (dispatch: any) => {
    await axios
      .get(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon?limit=10`)
      .then((response) => {
        dispatch(getAll(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Reducer
export default crudSlice.reducer;