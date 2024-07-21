import { PokedexPokemon } from '../../API/types';
import './Pokelist.scss';

interface PokelistProps {
  pokedex: PokedexPokemon[];
}

export const Pokelist = ({ pokedex }: PokelistProps) => {
  const pokemonlist = pokedex.map((pokemon) => {
    return <li key={pokemon.name}>{pokemon.name}</li>;
  });

  return <div className="pokelist">{pokemonlist}</div>;
};
