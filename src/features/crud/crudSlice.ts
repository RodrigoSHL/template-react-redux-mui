import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import pokemonApi from "../../api/pokemonApi";
import { initialStateCrud } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";
import { errorColor, successColor } from "../../components/Middleware/Snackbar";
import { IPokemonCreate } from "../../interfaces/IPokemon.interface";
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
      return { ...state, ...action.payload };
    },
    setInfoUpdated: (
      state: any = initialStateCrud,
      action: PayloadAction<any>
    ) => {
      return { ...state, pokemon: action.payload };
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
export const { getAll, deleteOne, setInfoUpdated } = crudSlice.actions;

//Business
export const findAll = () => async (dispatch: any) => {
  await pokemonApi
    .get(`/pokemon?limit=600`)
    .then((response) => {
      dispatch(getAll(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const remove = (id: string) => async (dispatch: any) => {
  await pokemonApi
    .delete(`/pokemon/${id}`)
    .then((response) => {
      dispatch(deleteOne(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const create = (obj: IPokemonCreate) => async (dispatch: any) => {
  await pokemonApi
    .post(`/pokemon/`, obj)
    .then((response) => {
      const msg: string = "Pokemon successfully saved";
      dispatch(setOpenSnackbar(successResponseSetting(msg)));
    })
    .catch((error) => {
      const msg: string = error.response.data.message;
      dispatch(setOpenSnackbar(errorResponseSetting(msg)));
    });
};

export const update = (obj: any, id: string) => async (dispatch: any) => {
  const objPokemon: IPokemonCreate = {
    name: obj.name,
    no: obj.no,
  };
  await pokemonApi
    .patch(
      `/pokemon/${id}`,
      objPokemon
    )
    .then((response) => {
      const msg: string = "Pokemon successfully updated";
      dispatch(setOpenSnackbar(successResponseSetting(msg)));
    })
    .catch((error) => {
      const msg: string = error.response.data.message;
      dispatch(setOpenSnackbar(errorResponseSetting(msg)));
    });
};

export const findOne = (param: any) => async (dispatch: any) => {
  await pokemonApi
    .get(`/pokemon/${param.search}`)
    .then((response) => {
      let arr = [response.data]
      dispatch(getAll(arr));
    })
    .catch((error) => {
      const msg: string = error.response.data.message;
      dispatch(setOpenSnackbar(errorResponseSetting(msg)));
    });
};

//State-Reducer
export const selectCrud = (state: RootState) => state.crud;

// Reducer
export default crudSlice.reducer;
