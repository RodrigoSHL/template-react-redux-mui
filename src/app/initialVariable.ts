import { AlertColor } from "@mui/material";

const severityColor: AlertColor = "warning";
interface IPokemonInfo {
  name: string;
  weight: number;
  height: number;
  sprites: string;
  types: string[]
}

const Pokemon:IPokemonInfo = {name:'',weight:0,height:0,sprites:'',types:[]}

/* Pokeapi */
export const initialStateCrud = {
  results: []
};

/* Pokeapi */
export const initialStatePokeapi = {
  count: 0,
  next: null,
  previous: null,
  results: [],
  onePokemon: Pokemon,
};

/* Snackbar */
export const initialStateSetSnackbar = {
  isOpen: false,
  message: "",
  severity: severityColor,
  timeOut: 0,
};

export const initialStateSnack = {
  dataSnackbar: { ...initialStateSetSnackbar },
};

/* Slice Base */
export const initialStateExample = {
  listExample: [],
};
