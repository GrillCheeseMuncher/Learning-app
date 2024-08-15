import { Fragment, useEffect, useState } from 'react';
import {
  ChainLink,
  NamedAPIResource,
  Pokemon,
  PokemonSpeciesWithEvolutionChain,
} from '../../../../API/types';
import './Pokemon-Evolution.scss';
import { fetch_pokemon } from '../../../../API';

interface PokemonEvolutionProps {
  pokemonSpecies: PokemonSpeciesWithEvolutionChain;
  capitalizeFirstLetter: (stat: string) => string;
  currentPokemonName: string;
  onEvolutionClick: (pokemon: Pokemon) => void;
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({
  pokemonSpecies,
  capitalizeFirstLetter,
  currentPokemonName,
  onEvolutionClick,
}) => {
  const [evolution, setEvolution] = useState<(Pokemon | undefined)[]>([]);

  useEffect(() => {
    const fetchEvolutionPokemons = async () => {
      const speciesChain = evolutionChain(pokemonSpecies.evolution_chain.chain);
      const responses = await Promise.all(
        speciesChain.map((species) => fetch_pokemon(species.name))
      );
      return responses;
    };

    fetchEvolutionPokemons().then((results) => setEvolution(results));
  }, [pokemonSpecies]);

  const evolutionChain = (chain: ChainLink, results: NamedAPIResource[] = []) => {
    const partialResults: NamedAPIResource[] = results;
    if (chain.species) {
      partialResults.push(chain.species);
    }
    if (chain.evolves_to.length > 0) {
      evolutionChain(chain.evolves_to[0], partialResults);
    }
    return partialResults;
  };

  const evolutionList = evolution.map((evo, index) => {
    if (evo === undefined) {
      return null;
    }

    const evolutionImage = evo.sprites.other['official-artwork'].front_default;
    const separator =
      index < evolution.length - 1 ? (
        <span key={index} className="evolution-separator">
          →
        </span>
      ) : null;

    return (
      <Fragment key={index}>
        <div className="evolution-item" onClick={() => onEvolutionClick(evo)}>
          {evolutionImage && (
            <img
              src={evolutionImage}
              alt={evo.name}
              width="140"
              height="140"
              className={`evolution-picture ${
                evo.name === currentPokemonName ? 'current-pokemon-picture' : ''
              }`}
            />
          )}
          <span
            className={`evolution-text ${evo.name === currentPokemonName ? 'current-pokemon' : ''}`}
          >
            {capitalizeFirstLetter(evo.name)}
          </span>
        </div>
        {index < evolution?.length - 1 && <div>{separator}</div>}
      </Fragment>
    );
  });

  return (
    <div className="pokelist-evolution-container">
      <div className="pokelist-evolution-additional-text">Evolution Chain</div>
      <div className="pokelist-evolution-chain-container">
        <div className="pokelist-evolution-chain">{evolutionList}</div>
      </div>
    </div>
  );
};

export default PokemonEvolution;
