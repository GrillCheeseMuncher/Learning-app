import { PokedexIndexPokemon, PokedexPokemon } from './types';

export const pokedex_mapper = (pokedex: PokedexPokemon[]): PokedexIndexPokemon[] => {
  const results = pokedex.map((item) => {
    const url = item.url.split('/');
    const id = +url[url.length - 2];

    return {
      ...item,
      id,
    } as PokedexIndexPokemon;
  });

  return results;
};
