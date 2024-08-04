import { useEffect, useState } from 'react';
import { PokedexIndexPokemon, Pokemon, PokemonSpecies } from '../../API/types';
import FilterButton from '../FilterButton/FilterButton';
import './Pokelist.scss';
import { fetch_pokemon, fetch_pokemon_species } from '../../API';
import { stat } from 'fs';
import { spawn } from 'child_process';
import PokemonStats from './PokemonStats/PokemonStats';
import PokemonAbilities from './PokemonAbilities/PokemonAbilities';
import PokemonBreeding from './PokemonBreeding/PokemonBreeding';
import PokemonDetailedInformations from './PokemonDetailedInformations/PokemonDetailedInformations';
import PokemonSearch from '../SearchBar/SearchBar';
import Searchbar from '../SearchBar/SearchBar';

interface PokelistProps {
  pokedex: PokedexIndexPokemon[];
  setPokedex: React.Dispatch<React.SetStateAction<PokedexIndexPokemon[]>>;
}

const capitalizeFirstLetter = (string: string) => {
  return string
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
};

const propotionsFixed = (value: number) => (value / 10).toFixed(1);

const abbreviationConverter = (stat: string) => {
  const stats: { [key: string]: string } = {
    attack: 'Atk',
    defense: 'Def',
    'special-attack': 'SpA',
    'special-defense': 'SpD',
    speed: 'Spe',
    hp: 'HP',
  };
  return stats[stat];
};

export const Pokelist = ({ pokedex, setPokedex }: PokelistProps) => {
  const [pokemonList, setPokemonList] = useState<PokedexIndexPokemon[]>(pokedex);
  const [pokemonName, setPokemonName] = useState<string>('');
  const [currentPokemon, setCurrentPokemon] = useState<number | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | undefined>(undefined);

  useEffect(() => {
    if (pokemonName.length < 0) {
      setPokemonList(pokedex);
    } else {
      const pokemonListFilter = pokedex.filter((item) =>
        item.name?.toLocaleLowerCase().includes(pokemonName.toLocaleLowerCase())
      );
      setPokemonList(pokemonListFilter);

      pokemonList.map((pokemon) => (
        <li key={pokemon.name} className="pokelist-items">
          {capitalizeFirstLetter(pokemon.name)}
        </li>
      ));
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

  const pokeListMapper = pokemonList.map((pokemon) => {
    const handleCurrentPokemon = () => {
      setCurrentPokemon(pokemon.id);
      fetch_pokemon(pokemon.name).then((pokemon) => setPokemon(pokemon));
      fetch_pokemon_species(pokemon.id).then((res) => setPokemonSpecies(res));
    };

    return (
      <li
        key={pokemon.name}
        className={`pokelist-items${currentPokemon === pokemon.id ? ' active' : ''}`}
        onClick={handleCurrentPokemon}
      >
        {capitalizeFirstLetter(pokemon.name)}
      </li>
    );
  });

  return (
    <div className="pokelist-container">
      <div className="pokelist-left">
        <Searchbar
          pokemonName={pokemonName}
          handlePokemonNameChange={handlePokemonNameChange}
          handleLetterSort={handleLetterSort}
          handleNumberSort={handleNumberSort}
        />
        <div className="pokelist-grid-container">
          <div className="pokelist-grid">{pokeListMapper}</div>
        </div>
      </div>
      <div className="pokelist-right">
        {pokemon && (
          <div className="pokelist-description">
            <div className="pokelist-description-left-container">
              <div className="pokelist-description-image">
                <img
                  src={pokemon?.sprites.other['official-artwork'].front_default}
                  width="300"
                  height="300"
                />
              </div>
              <div className="pokelist-description-information">
                <div className="pokemon-name">{capitalizeFirstLetter(pokemon.name)}</div>

                <PokemonDetailedInformations
                  pokemon={pokemon}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  propotionsFixed={propotionsFixed}
                />
                <PokemonStats pokemon={pokemon} abbreviationConverter={abbreviationConverter} />
              </div>
            </div>
            <div className="pokelist-description-right-container">
              <PokemonBreeding />

              <PokemonAbilities pokemon={pokemon} capitalizeFirstLetter={capitalizeFirstLetter} />

              <div className="pokelist-description-right-container-base-stats"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
