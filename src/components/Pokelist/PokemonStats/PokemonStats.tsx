import { Pokemon, PokemonSpecies } from '../../../API/types';
import './PokemonStats.scss';

interface PokemonStatsProps {
  pokemon: Pokemon;
  pokemonSpecies: PokemonSpecies;
  abbreviationConverter: (stat: string) => string;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({
  pokemon,
  abbreviationConverter,
  pokemonSpecies,
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
    <div className="all-stats-container">
      <div className="stats-additional-text">Base Stats</div>
      <div className="experience-container">
        <div className="pokelist-base-stats-experience">
          <span>{pokemon.base_experience}</span>
          <span className="experience-text">Base Exp</span>
        </div>
        <div className="pokelist-base-stats-experience">
          <span>{grothRateConverter(pokemonSpecies.growth_rate.name)}</span>
          <span className="experience-text">Lvl Rate</span>
        </div>
      </div>
      <div className="stats-container">
        {pokemon.stats.map((stats) => (
          <div className={`stats-container-each-stat ${stats.stat.name}`} key={stats.stat.name}>
            <span>{stats.base_stat}</span>
            <span>{abbreviationConverter(stats.stat.name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
