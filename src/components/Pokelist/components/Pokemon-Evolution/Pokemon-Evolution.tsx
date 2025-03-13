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
    let step = 0;
    const evolutions = chain.evolves_to.reduce((acc, cur) => {
      acc[step] = [chain.species, ...evolutionChain(cur)];
      ++step;

      if (cur.evolves_to.length > 1) {
        cur.evolves_to.forEach((evol, i) => {
          if (i > 0) {
            acc[step] = [chain.species, cur.species, ...evolutionChain(evol)];
            ++step;
          }
        });
      }

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
                  width="fit-content"
                  height="fit-content"
                  className={`evolution-picture ${isCurrent ? 'current-pokemon-picture' : ''}`}
                />
              )}
              <span className={`evolution-text ${isCurrent ? 'current-pokemon' : ''}`}>
                {capitalizeFirstLetter(evo.name)}
              </span>
            </div>
            {index < evolutionPath.length - 1 && (
              <div className="evolution-separator">
                <svg width="fit-content" height="fit-content" viewBox="0 0 24 24" fill="#181a1b">
                  <path d="M14.7055 18.9112C14.2784 18.7306 14 18.3052 14 17.8333V15H3C2.44772 15 2 14.5523 2 14V10C2 9.44772 2.44772 9 3 9H14V6.1667C14 5.69483 14.2784 5.26942 14.7055 5.08884C15.1326 4.90826 15.6241 5.00808 15.951 5.34174L21.6653 11.175C22.1116 11.6307 22.1116 12.3693 21.6653 12.825L15.951 18.6583C15.6241 18.9919 15.1326 19.0917 14.7055 18.9112Z" />
                </svg>
              </div>
            )}
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
