import { warningColor } from "../components/Middleware/Snackbar";
import { IPokemonInfo } from "../interfaces/IPokeApi.interface";

/* Auth */
export const initialStateAuth = {
  status: 'checking', //'authenticated' - 'not-authenticated'
  user: {},
  errorMessage: undefined
};

/* Calendar */
export const initialStateCalendar= {
  title: '',
};

/* CRUD */
export const initialStateCrud = {
  results: [],
  pokemon: {}
};

/* Pokeapi */
const Pokemon: IPokemonInfo = {
  name: "",
  weight: 0,
  height: 0,
  sprites: "",
  types: [],
};

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
  severity: warningColor,
  timeOut: 0,
};

export const initialStateSnack = {
  dataSnackbar: { ...initialStateSetSnackbar },
};

/* Slice Base */
export const initialStateExample = {
  listExample: [],
};

/* UI */
export const initialStateUI= {
  isDateModalOpen: false,
};
