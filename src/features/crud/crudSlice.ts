import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateCrud } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";

export const crudSlice = createSlice({
  name: types.crudType,
  initialState: { ...initialStateCrud },
  reducers: {
    getAll: (state: any = initialStateCrud, action: PayloadAction<any>) => {
      return { ...state, results: action.payload };
    },
    deleteOne: (state: any = initialStateCrud, action: PayloadAction<any>) => {
      return { ...state, ...action.payload, pokemon: null };
    },
  },
});

//Action
export const { getAll, deleteOne } = crudSlice.actions;

//Business
export const findAll = () => async (dispatch: any) => {
  await axios
    .get(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon?limit=600`)
    .then((response) => {
      dispatch(getAll(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const remove = (id:string) => async (dispatch: any) => {
  await axios
    .delete(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/${id}`)
    .then((response) => {
      dispatch(deleteOne(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

//State-Reducer
export const selectCrud = (state: RootState) => state.crud;

// Reducer
export default crudSlice.reducer;
