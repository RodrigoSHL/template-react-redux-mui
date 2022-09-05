import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateCrud } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";
import { errorColor, successColor } from "../../components/Middleware/Snackbar";
import { IPokemonCreate } from "../../interfaces/IPokemonCreate.interface";
import { setOpenSnackbar } from "../snackbar/snackbarSlice";

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

export const create = (obj:IPokemonCreate) => async (dispatch: any) => {
  await axios
    .post(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/`, obj)
    .then((response) => {
      console.log(response)
      const objSetting = {isOpen: true,message: 'Pokemon creado correctamente',severity: successColor,timeOut : 2000}
      dispatch(setOpenSnackbar(objSetting)); 
    })
    .catch((error) => {
      const objSetting = {isOpen: true,message: error.message,severity: errorColor,timeOut : 2000}
      dispatch(setOpenSnackbar(objSetting));    });
};

export const update = (obj:IPokemonCreate, id:string) => async (dispatch: any) => {
  await axios
    .patch(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/`, obj)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });
};

//State-Reducer
export const selectCrud = (state: RootState) => state.crud;

// Reducer
export default crudSlice.reducer;
