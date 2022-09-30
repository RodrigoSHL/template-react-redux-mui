import { warningColor } from "../components/Middleware/Snackbar";
import { IPokemonInfo } from "../interfaces/IPokeApi.interface";
import { IUserSession } from "../interfaces/IUserSession.interface";

/* Auth */
const userSessionObject: IUserSession = {
  name: "",
  uid: "",
  roles: [],

};

export const initialStateAuth = {
  status: "checking", //'authenticated' - 'not-authenticated'
  user: userSessionObject,
  errorMessage: undefined,
  isSuper: false,
  isAdmin: false,
};

/* Calendar */
const activeEventObject: any = null;

export const initialStateCalendar = {
  isLoadingEvents: true,
  events: [],
  activeEvent: activeEventObject,
};

/* CRUD */
export const initialStateCrud = {
  results: [],
  pokemon: {},
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
export const initialStateUI = {
  isDateModalOpen: false,
};
