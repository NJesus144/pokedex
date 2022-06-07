import { useRoutes } from "react-router-dom";
import FavoritesScreenPokemon from "../favorites/contexts/FavoritesScreenPokemon";
import Pokedex from "../pokedex/Pokedex";
import PokemonDetails from "../pokemon/PokemonDetails";

export const MainRoutes = () => {
  return useRoutes([
    { path: "/", element: <Pokedex /> },
    { path: "/pokemon/:name", element: <PokemonDetails /> },
    { path: "/favorites", element: <FavoritesScreenPokemon /> },
  ]);
};
