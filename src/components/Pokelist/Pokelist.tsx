import { useEffect, useState } from 'react';
import { fetch_pokemon, fetch_pokemon_species } from '../../API';
import { PokedexIndexPokemon, Pokemon, PokemonSpeciesWithEvolutionChain } from '../../API/types';
import Searchbar from '../SearchBar/SearchBar';
import PokemonAbilities from './components/Pokemon-Abilities/Pokemon-Abilities';
import PokemonBreeding from './components/Pokemon-Breeding/Pokemon-Breeding';
import PokemonDetailedInformations from './components/Pokemon-Detailed-Informations/Pokemon-Detailed-Informations';
import PokemonEvolution from './components/Pokemon-Evolution/Pokemon-Evolution';
import PokemonForms from './components/Pokemon-Forms/Pokemon-Forms';
import PokemonImage from './components/Pokemon-Image/Pokemon-Image';
import PokemonLessImportantInformations from './components/Pokemon-Less-Important-Informations/Pokemon-Less-Important-Informations';
import PokemonNametag from './components/Pokemon-Nametag/Pokemon-Nametag';
import PokemonStats from './components/Pokemon-Stats/Pokemon-Stats';
import './Pokelist.scss';

interface PokelistProps {
  pokedex: PokedexIndexPokemon[];
  setPokedex: React.Dispatch<React.SetStateAction<PokedexIndexPokemon[]>>;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
  modifiedPokemonName: (name: string) => string;
}

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

export const Pokelist = ({
  pokedex,
  setPokedex,
  idConverter,
  capitalizeFirstLetter,
  modifiedPokemonName,
}: PokelistProps) => {
  const [pokemonList, setPokemonList] = useState<PokedexIndexPokemon[]>(pokedex);
  const [pokemonName, setPokemonName] = useState<string>('');
  const [currentPokemon, setCurrentPokemon] = useState<number | undefined>(undefined);
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);
  const [pokemonSpecies, setPokemonSpecies] = useState<
    PokemonSpeciesWithEvolutionChain | undefined
  >(undefined);
  const [selectedVariant, setSelectedVariant] = useState<Pokemon | undefined>(undefined);
  const [isRightPanelVisible, setIsRightPanelVisible] = useState<boolean>(false);

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

  const modifiedPokemonNameList = (name: string): string => {
    let modifiedName = name.replace('-disguised', '');
    modifiedName = modifiedName.replace('-midday', '');

    return modifiedName;
  };

  const handleChainClick = (pokemon: Pokemon) => {
    setSelectedVariant(pokemon);
    setCurrentPokemon(pokemon.id);
    setPokemon(pokemon);
    fetch_pokemon_species(pokemon.id).then((res) => {
      setPokemonSpecies(res);
    });
  };

  const handleCurrentPokemon = (pokemon: PokedexIndexPokemon) => {
    setCurrentPokemon(pokemon.id);
    fetch_pokemon(pokemon.name).then((pokemonData) => {
      setPokemon(pokemonData);
      setSelectedVariant(undefined);
      setIsRightPanelVisible(true);
    });
    fetch_pokemon_species(pokemon.id).then((res) => {
      setPokemonSpecies(res);
    });
  };

  const handleCloseRightPanel = () => {
    setIsRightPanelVisible(false);
  };

  const pokeListMapper = pokemonList.map((pokemon) => {
    if (pokemon.id >= 10000) {
      return null;
    }

    return (
      <li
        key={pokemon.name}
        className={`pokelist-items${currentPokemon === pokemon.id ? ' active' : ''}`}
        onClick={() => handleCurrentPokemon(pokemon)}
      >
        <span className="item-content">
          {pokemon && pokemon.id < 10000 ? idConverter(pokemon.id) : ''}
        </span>
        <span className="item-content">
          {capitalizeFirstLetter(modifiedPokemonNameList(pokemon.name))}{' '}
        </span>
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
      <div className={`pokelist-right${isRightPanelVisible ? ' visible' : ''}`}>
        {pokemon && pokemonSpecies ? (
          <div className="pokelist-description">
            <button className="right-close-panel" onClick={handleCloseRightPanel}>
              Close
            </button>
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
                  fixedHeight
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
                  bottomMargin
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
                onEvolutionClick={handleChainClick}
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
