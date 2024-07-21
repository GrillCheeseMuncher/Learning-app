import axios from 'axios';
import { PokedexApiResponse } from './types';

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
