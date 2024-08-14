import { useEffect, useState } from 'react';
import {
  PokedexIndexPokemon,
  Pokemon,
  PokemonSpecies,
  PokemonSpeciesWithEvolutionChain,
} from '../../API/types';
import './Pokelist.scss';
import { fetch_pokemon, fetch_pokemon_species } from '../../API';
import PokemonStats from './components/Pokemon-Stats/Pokemon-Stats';
import PokemonAbilities from './components/Pokemon-Abilities/Pokemon-Abilities';
import PokemonBreeding from './components/Pokemon-Breeding/Pokemon-Breeding';
import PokemonDetailedInformations from './components/Pokemon-Detailed-Informations/Pokemon-Detailed-Informations';
import Searchbar from '../SearchBar/SearchBar';
import PokemonForms from './components/Pokemon-Forms/Pokemon-Forms';
import PokemonEvolution from './components/Pokemon-Evolution/Pokemon-Evolution';
import PokemonImage from './components/Pokemon-Image/Pokemon-Image';
import PokemonNametag from './components/Pokemon-Nametag/Pokemon-Nametag';
import PokemonLessImportantInformations from './components/Pokemon-Less-Important-Informations/Pokemon-Less-Important-Informations';

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
  const [pokemonSpecies, setPokemonSpecies] = useState<
    PokemonSpeciesWithEvolutionChain | undefined
  >(undefined);
  const [selectedVariant, setSelectedVariant] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    if (pokemonName.startsWith('#')) {
      const id = parseInt(pokemonName.substring(1), 10);
      if (!isNaN(id)) {
        const pokemonListFilter = pokedex.filter((item) => item.id === id);
        setPokemonList(pokemonListFilter);
      } else {
        setPokemonList([]);
      }
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

  const modifiedPokemonName = (name: string) => {
    return name.replace('-disguised', '');
  };

  const pokeListMapper = pokemonList.map((pokemon) => {
    if (pokemon.id >= 10000) {
      return null;
    }

    const handleCurrentPokemon = () => {
      setCurrentPokemon(pokemon.id);
      fetch_pokemon(pokemon.name).then((pokemon) => {
        setPokemon(pokemon);
        setSelectedVariant(undefined);
      });
      fetch_pokemon_species(pokemon.id).then((res) => setPokemonSpecies(res));
    };

    const displayedPokemonName = modifiedPokemonName(pokemon.name);

    return (
      <li
        key={pokemon.name}
        className={`pokelist-items${currentPokemon === pokemon.id ? ' active' : ''}`}
        onClick={handleCurrentPokemon}
      >
        <span className="item-content">
          {pokemon && pokemon.id < 10000 ? idConverter(pokemon.id) : ''}
        </span>
        <span className="item-content">{capitalizeFirstLetter(displayedPokemonName)} </span>
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
              <PokemonImage pokemon={selectedVariant || pokemon} />
              <div className="pokelist-description-information">
                <PokemonNametag
                  pokemon={selectedVariant || pokemon}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  idConverter={idConverter}
                  displayedPokemonName={modifiedPokemonName(
                    selectedVariant?.name || pokemon?.name || ''
                  )}
                />
                <PokemonDetailedInformations
                  pokemon={selectedVariant || pokemon}
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                  propotionsFixed={propotionsFixed}
                />
                <PokemonStats
                  pokemon={selectedVariant || pokemon}
                  abbreviationConverter={abbreviationConverter}
                  pokemonSpecies={pokemonSpecies}
                />
                <PokemonLessImportantInformations
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
              </div>
            </div>
            <div className="pokelist-description-right-container">
              <div className="pokelist-abilities-breeding-container">
                <PokemonAbilities
                  abilities={(selectedVariant || pokemon).abilities}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
                <PokemonBreeding
                  pokemonSpecies={pokemonSpecies}
                  capitalizeFirstLetter={capitalizeFirstLetter}
                />
              </div>
              <PokemonEvolution
                capitalizeFirstLetter={capitalizeFirstLetter}
                pokemonSpecies={pokemonSpecies}
                currentPokemonName={pokemon.name}
              />
              <PokemonForms
                currentDisplayPokemon={selectedVariant || pokemon}
                pokemonSpecies={pokemonSpecies}
                capitalizeFirstLetter={capitalizeFirstLetter}
                onFormClick={setSelectedVariant}
              />
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
