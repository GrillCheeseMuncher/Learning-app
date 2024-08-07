import { useEffect, useState } from 'react';
import { PokedexIndexPokemon, Pokemon, PokemonSpecies } from '../../API/types';
import './Pokelist.scss';
import { fetch_pokemon, fetch_pokemon_species } from '../../API';
import PokemonStats from './PokemonStats/PokemonStats';
import PokemonAbilities from './PokemonAbilities/PokemonAbilities';
import PokemonBreeding from './PokemonBreeding/PokemonBreeding';
import PokemonDetailedInformations from './PokemonDetailedInformations/PokemonDetailedInformations';
import Searchbar from '../SearchBar/SearchBar';
import PokemonForms from './PokemonForms/PokemonForms';
import PokemonEvolution from './PokemonEvolution/PokemonEvolution';
import PokemonImage from './PokemonImage/PokemonImage';
import PokemonNametag from './PokemonNametag/PokemonNametag';
import PokemonLessImportantInformations from './PokemonLessImportantInformations/PokemonLessImportantInformations';

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

const idConverter = (number: number) => {
  return `#${number.toString().padStart(4, '0')}`;
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
    if (pokemon.id >= 10000) {
      return null;
    }

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
        <span className="item-content">
          {pokemon && pokemon.id < 10000 ? idConverter(pokemon.id) : ''}
        </span>
        <span className="item-content">{capitalizeFirstLetter(pokemon.name)} </span>
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
        {pokemon && pokemonSpecies ? (
          <div className="pokelist-description">
            <div className="pokelist-description-left-container">
              <PokemonImage pokemon={pokemon} />
              <div className="pokelist-description-information">
                <PokemonNametag
                  pokemon={pokemon}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  idConverter={idConverter}
                />
                <PokemonDetailedInformations
                  pokemon={pokemon}
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  propotionsFixed={propotionsFixed}
                />
                <PokemonStats
                  pokemon={pokemon}
                  abbreviationConverter={abbreviationConverter}
                  pokemonSpecies={pokemonSpecies}
                />
                <PokemonLessImportantInformations
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="pokelist-description-right-container">
              <PokemonEvolution
                capitalizeFirstLetter={capitalizeFirstLetter}
                pokemonSpecies={pokemonSpecies}
              />
              <PokemonForms
                capitalizeFirstLetter={capitalizeFirstLetter}
                pokemonSpecies={pokemonSpecies}
              />
              <div className="pokelist-abilities-breeding-container">
                <PokemonAbilities
                  abilities={pokemon.abilities}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
                <PokemonBreeding
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="pokelist-description">
            <div className="welcome-pokedex">
              <span>Choose a Pokemon to Continue</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
