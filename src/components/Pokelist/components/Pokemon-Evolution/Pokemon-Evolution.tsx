import { Fragment, useEffect, useState } from 'react';
import { fetch_pokemon } from '../../../../API';
import {
  ChainLink,
  NamedAPIResource,
  Pokemon,
  PokemonSpeciesWithEvolutionChain,
} from '../../../../API/types';
import './Pokemon-Evolution.scss';

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
  const [evolution, setEvolution] = useState<(Pokemon | undefined)[][]>([]);
  const [altEvolution, setAltEvolution] = useState<Record<number, NamedAPIResource[]>>({});
  const [fetchQueue, setFetchQueue] = useState(0);

  useEffect(() => {
    if (!altEvolution[fetchQueue]) return;

    const fetchEvolutionPokemons = async () => {
      const responses = await Promise.all(
        altEvolution[fetchQueue].map((species) => fetch_pokemon(species.name))
      );
      return responses;
    };

    fetchEvolutionPokemons().then((results) => {
      setEvolution((evolution) => [...evolution, results]);
      setFetchQueue((fetchQueue) => ++fetchQueue);
    });
  }, [altEvolution, fetchQueue]);

  useEffect(() => {
    setFetchQueue(0);
    setEvolution([]);

    const chain = pokemonSpecies.evolution_chain.chain;
    const evolutions = chain.evolves_to.reduce((acc, cur, i) => {
      acc[i] = [chain.species, ...evolutionChain(cur)];

      return acc;
    }, {} as Record<number, NamedAPIResource[]>);

    setAltEvolution(evolutions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const evolutionList = evolution.map((evolutionPath) => (
    <div className="evolution-path">
      {evolutionPath.map((evo, index) => {
        if (evo === undefined) return null;

        const isCurrent = evo.name === currentPokemonName;
        const evolutionImage = evo.sprites.other['official-artwork'].front_default;

        return (
          <Fragment key={index}>
            <div className="evolution-item" onClick={() => onEvolutionClick(evo)}>
              {evolutionImage && (
                <img
                  src={evolutionImage}
                  alt={evo.name}
                  width="140"
                  height="140"
                  className={`evolution-picture ${isCurrent ? 'current-pokemon-picture' : ''}`}
                />
              )}
              <span className={`evolution-text ${isCurrent ? 'current-pokemon' : ''}`}>
                {capitalizeFirstLetter(evo.name)}
              </span>
            </div>
            {index < evolutionPath.length - 1 && <div className="evolution-separator">→</div>}
          </Fragment>
        );
      })}
    </div>
  ));

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
