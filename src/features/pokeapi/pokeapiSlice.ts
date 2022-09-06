import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { initialStatePokeapi } from "../../app/initialVariable";
import { RootState } from "../../app/store";
import { types } from "../../app/types";
import { IPokemonInfo } from "../../interfaces/IPokemonInfo.interface";

export const pokeapiSlice = createSlice({
  name: types.pokeapiType,
  initialState: { ...initialStatePokeapi },
  reducers: {
    getAllPokemon: (state: any = initialStatePokeapi, action: PayloadAction<any>) => {
      return {...state, ...action.payload}
    },
    getNextPokemon: (state: any = initialStatePokeapi, action: PayloadAction<any>) => {
      return {...state, ...action.payload}
    },
    setInfoPokemon: (state: any = initialStatePokeapi, action: PayloadAction<any>) => {
      return {...state, onePokemon: action.payload }
    },
  },
});

//Action
export const { getAllPokemon, getNextPokemon, setInfoPokemon} = pokeapiSlice.actions;

//Business
export const getAllPokeapi = () => async (dispatch: any) => {
  await axios
    .get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
    .then((response) => {
      dispatch(getAllPokemon(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNextPokeapi = () => async (dispatch: any, getState:any) => {
  const {next} = getState().pokeapi;
  await axios
    .get(next)
    .then((response) => {
      dispatch(getNextPokemon(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getPrevPokeapi = () => async (dispatch: any, getState:any) => {
  const {previous} = getState().pokeapi;
  await axios
    .get(previous)
    .then((response) => {
      dispatch(getNextPokemon(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getInfoPokeapi = (url:string='https://pokeapi.co/api/v2/pokemon/1') => async (dispatch: any) => {

  await axios
    .get<IPokemonInfo>(url)
    .then((response) => {
      const arrTypes: string[] = [];
      response.data.types.forEach((type:any) => arrTypes.push(type.type.name));
      dispatch(setInfoPokemon({
        name: response.data.name,
        weight: response.data.weight,
        height: response.data.height,
        sprites: response.data.sprites.other?.["official-artwork"].front_default,
        types: arrTypes
      }));
    })
    .catch((error) => {
      console.log(error);
    });
};

//State-Reducer
export const selectPokeapi = (state: RootState) => state.pokeapi;

// Reducer
export default pokeapiSlice.reducer;
