import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from "@mui/material";
import styles from "./Pokeapi.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getAllPokeapi,
  getNextPokeapi,
  getPrevPokeapi,
  getInfoPokeapi,
  selectPokeapi,
} from "../../features/pokeapi/pokeapiSlice";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import Detail from "./Detail";

interface IPokemon {
  name: string;
  url: string;
}
const Pokeapi = () => {
  const dispatch = useAppDispatch();
  const { results: POKEMONS } = useAppSelector(selectPokeapi);
  const { next } = useAppSelector(selectPokeapi);
  const { previous } = useAppSelector(selectPokeapi);

  return (
    <>
      <Container maxWidth="lg">
        <Box className={styles.container}>
          <Box component="main" className={styles.containerTable}>
            <h2>Pokemon's List</h2>
            <Stack direction="row" spacing={2}>
              {POKEMONS.length === 0 && (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(getAllPokeapi())}
                >
                  Get Pokemon
                </Button>
              )}
              {previous && (
                <Button
                  variant="outlined"
                  onClick={() => dispatch(getPrevPokeapi())}
                >
                  Previous
                </Button>
              )}
              {next && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(getNextPokeapi())}
                >
                  Next
                </Button>
              )}
            </Stack>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <List>
                  {POKEMONS.map((pokemon: IPokemon, index: number) => {
                    return (
                      <ListItem
                        secondaryAction={
                          <IconButton
                            onClick={() => {
                              dispatch(getInfoPokeapi(pokemon.url));
                            }}
                            color="primary"
                            aria-label="upload picture"
                            component="label"
                          >
                            <VisibilityIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <CatchingPokemonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          className={styles.upper}
                          key={index}
                          primary={pokemon.name}
                          secondary={"N°" + pokemon.url.split("/")[6]}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Detail />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Pokeapi;
