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
  return (
    <div className="all-stats-container">
      <div className="stats-additional-text">Base Stats</div>

      <div className="stats-container">
        {pokemon.stats.map((stats) => (
          <div key={stats.stat.name} className={`stats-container-each-stat ${stats.stat.name}`}>
            <span>{stats.base_stat}</span>
            <span>{abbreviationConverter(stats.stat.name)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonStats;
