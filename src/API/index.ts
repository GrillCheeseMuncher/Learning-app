import axios from 'axios';
import { PokedexApiResponse, Pokemon, PokemonSpecies } from './types';
import { Pokelist } from '../components/Pokelist/Pokelist';

export const fetch_pokedex = () =>
  axios
    .get<PokedexApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      return {
        count: 0,
        next: null,
        previous: null,
        results: [],
      } as PokedexApiResponse;
    });

export const fetch_pokemon = (pokemonName: string) =>
  axios
    .get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      return undefined;
    });

export const fetch_pokemon_species = (pokemonId: number) =>
  axios
    .get<PokemonSpecies>(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}/`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      return undefined;
    });
