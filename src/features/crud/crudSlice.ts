import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStateCrud } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";
import { errorColor, successColor } from "../../components/Middleware/Snackbar";
import { IPokemonCreate } from "../../interfaces/IPokemonCreate.interface";
import { ISnackbar } from "../../interfaces/ISnackbar.interface";
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

const successResponseSetting = (msg: string) => ({
  isOpen: true,
  message: msg,
  severity: successColor,
  timeOut: 4000,
});

const errorResponseSetting = (error: string): ISnackbar => ({
  isOpen: true,
  message: error,
  severity: errorColor,
  timeOut: 4000,
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

export const remove = (id: string) => async (dispatch: any) => {
  await axios
    .delete(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/${id}`)
    .then((response) => {
      dispatch(deleteOne(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const create = (obj: IPokemonCreate) => async (dispatch: any) => {
  await axios
    .post(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/`, obj)
    .then((response) => {
      const msg: string = "Pokemon successfully saved"
      dispatch(setOpenSnackbar(successResponseSetting(msg)));
    })
    .catch((error) => {
      const msg: string = error.response.data.message;
      dispatch(setOpenSnackbar(errorResponseSetting(msg)));
    });
};

export const update =
  (obj: IPokemonCreate, id: string) => async (dispatch: any) => {
    await axios
      .patch(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/`, obj)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const findOne = (id: string) => async (dispatch: any) => {
  await axios
    .get(`https://pokedex-api-rest.herokuapp.com/api/v2/pokemon/${id}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

//State-Reducer
export const selectCrud = (state: RootState) => state.crud;

// Reducer
export default crudSlice.reducer;
