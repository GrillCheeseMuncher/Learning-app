import axios from 'axios';
import {
  EvolutionChain,
  PokedexApiResponse,
  Pokemon,
  PokemonSpecies,
  PokemonSpeciesWithEvolutionChain,
} from './types';

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
    .then(async (response) => {
      const chainUrl = response.data.evolution_chain.url;
      const chainResponse = await fetch_pokemon_evolution_chain(chainUrl);
      const responseWithEvolutionChain: PokemonSpeciesWithEvolutionChain = {
        ...response.data,
        evolution_chain: chainResponse!,
      };

      return responseWithEvolutionChain;
    })
    .catch((error) => {
      console.log(error);

      return undefined;
    });

export const fetch_pokemon_evolution_chain = (chainUrl: string) =>
  axios
    .get<EvolutionChain>(chainUrl)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);

      return undefined;
    });
