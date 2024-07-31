import { useEffect, useState } from 'react';
import { PokedexIndexPokemon } from '../../API/types';
import FilterButton from '../FilterButton/FilterButton';
import './Pokelist.scss';

interface PokelistProps {
  pokedex: PokedexIndexPokemon[];
  setPokedex: React.Dispatch<React.SetStateAction<PokedexIndexPokemon[]>>;
}

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const Pokelist = ({ pokedex, setPokedex }: PokelistProps) => {
  const [pokemonList, setPokemonList] = useState<PokedexIndexPokemon[]>(pokedex);
  const [pokemonName, setPokemonName] = useState<string>('');

  useEffect(() => {
    if (pokemonName.length < 0) {
      setPokemonList(pokedex);
    } else {
      const pokemonListFilter = pokedex.filter((item) =>
        item.name?.toLocaleLowerCase().includes(pokemonName.toLocaleLowerCase())
      );
      setPokemonList(pokemonListFilter);
    }
  }, [pokemonName, pokedex]);

  const handlePokemonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(e.target.value);
  };

  const handleLetterSort = (alphabetical: boolean) => {
    const pokeLetterSort = [...pokedex].sort((a, b) =>
      alphabetical ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setPokedex(pokeLetterSort);
  };

  const handleNumberSort = (numerical: boolean) => {
    const pokeNumberSort = [...pokedex].sort((a, b) => (numerical ? b.id - a.id : a.id - b.id));

    setPokedex(pokeNumberSort);
  };

  return (
    <div className="pokelist-container">
      <div className="pokelist-left">
        <div className="pokelist-search">
          <input
            placeholder="Search pokemon"
            type="search"
            className="pokelist-search-bar"
            value={pokemonName}
            onChange={handlePokemonNameChange}
          />
          <FilterButton handleLetterSort={handleLetterSort} handleNumberSort={handleNumberSort} />
        </div>
        <div className="pokelist-grid-container">
          <div className="pokelist-grid">
            {pokemonList.map((pokemon) => (
              <li key={pokemon.name} className="pokelist-items">
                {capitalizeFirstLetter(pokemon.name)}
              </li>
            ))}
          </div>
        </div>
      </div>
      <div className="pokelist-right">
        <div className="pokelist-description">
          <div className="pokelist-description-header">
            <div className="pokelist-description-image"></div>
            <div className="pokelist-description-information"></div>
          </div>
          <div className="pokelist-description-abilities">
            <div className="pokelist-description-moves"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
