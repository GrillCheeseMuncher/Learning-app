import React from 'react';
import { Pokemon } from '../../../API/types';
import './PokemonStats.scss';

interface PokemonStatsProps {
  pokemon: Pokemon;
  abbreviationConverter: (stat: string) => string;
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon, abbreviationConverter }) => {
  return (
    <div className="stats-container">
      <span className="stats-additional-text">Base Stats</span>
      <div className="stats-container-row">
        {pokemon.stats.map((stats) => (
          <div className={`stats-container-each-stat ${stats.stat.name}`} key={stats.stat.name}>
            <span>{stats.base_stat}</span>
            <span>{abbreviationConverter(stats.stat.name)}</span>
          </div>
        ))}
      </div>
      <div className="pokelist-base-stats-experience">
        Base experience: {pokemon.base_experience}
      </div>
    </div>
  );
};

export default PokemonStats;
