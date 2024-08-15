import { Pokemon, PokemonSpecies, PokemonSpeciesWithEvolutionChain } from '../../../../API/types';
import './Pokemon-Detailed-Informations.scss';

export interface PokemonDetailedInformationsProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpeciesWithEvolutionChain;
  capitalizeFirstLetter: (string: string) => string;
  propotionsFixed: (value: number) => string;
}

const PokemonDetailedInformations: React.FC<PokemonDetailedInformationsProps> = ({
  pokemon,
  pokemonSpecies,
  capitalizeFirstLetter,
  propotionsFixed,
}) => {
  const grothRateConverter = (stat: string) => {
    const stats: { [key: string]: string } = {
      slow: 'Slow',
      medium: 'Medium',
      fast: 'Fast',
      'medium-slow': 'Medium Slow',
      'medium-fast': 'Medium Fast',
      'fast-then-very-slow': 'Fluctuating',
      'slow-then-very-fast': 'Erratic',
    };
    return stats[stat];
  };

  return (
    <div className="pokemon-information-container">
      <div className="pokemon-type-information-container">
        <div className="pokemon-type-additional-text">Types</div>
        <div className="pokemon-type-container">
          {pokemon.types.map((types) => (
            <span key={types.type.name} className={`pokemon-type ${types.type.name}`}>
              {capitalizeFirstLetter(types.type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemon-all-proportions-container">
        <div className="pokemon-proportions-container height">
          <span className="propotions-information-name">Height</span>
          <span className="pokemon-detailed-information-small-white-box">
            {propotionsFixed(pokemon.height)} m
          </span>
        </div>
        <div className="pokemon-proportions-container weight">
          <span className="propotions-information-name">Weight</span>
          <span className="pokemon-detailed-information-small-white-box">
            {pokemon.weight === 10000 ? `??? kg` : `${propotionsFixed(pokemon.weight)} kg`}
          </span>
        </div>
      </div>

      <div className="experience-container">
        <div className="pokelist-base-stats-experience exp">
          <span className="experience-information-name">Base Exp</span>
          <span className="pokemon-detailed-information-small-white-box">
            {pokemon.base_experience === null ? `Unknown` : pokemon.base_experience}
          </span>
        </div>
        <div className="pokelist-base-stats-experience lvl">
          <span className="experience-information-name">Lvl Rate</span>
          <span className="pokemon-detailed-information-small-white-box">
            {grothRateConverter(pokemonSpecies.growth_rate.name)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailedInformations;
