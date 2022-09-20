import { addHours } from "date-fns";
import { warningColor } from "../components/Middleware/Snackbar";
import { IPokemonInfo } from "../interfaces/IPokeApi.interface";

/* Auth */
export const initialStateAuth = {
  status: "checking", //'authenticated' - 'not-authenticated'
  user: {},
  errorMessage: undefined,
};

/* Calendar */
const tempEventObject = {
  _id: '1313',
  title: "Happy Birthday Boss",
  notes: "Have to make the pastel ",
  start: new Date(),
  end: addHours(new Date(), 1),
  bgColor: "#f50057",
  user: {
    _id: "123",
    name: "Rodrigo Catalan",
  },
};

const activeEventObject: any = {}

export const initialStateCalendar = {
  events: [tempEventObject],
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
