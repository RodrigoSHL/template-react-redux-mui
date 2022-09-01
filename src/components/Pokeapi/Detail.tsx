import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getInfoPokeapi,
  selectPokeapi,
} from "../../features/pokeapi/pokeapiSlice";

const Detail = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = () => {
      dispatch(getInfoPokeapi());
    };
    fetchData();
  }, [dispatch]);

  const { onePokemon } = useAppSelector(selectPokeapi);

  return onePokemon ? (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={onePokemon.sprites}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Name: {onePokemon.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Types: {onePokemon.types.join(", ")}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Weight: {onePokemon.weight} | Height: {onePokemon.height}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  ): null
};

export default Detail;
