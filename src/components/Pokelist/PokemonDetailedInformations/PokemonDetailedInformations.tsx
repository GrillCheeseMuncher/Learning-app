import { Pokemon } from '../../../API/types';
import './PokemonDetailedInformations.scss';

export interface PokemonDetailedInformationsProps {
  pokemon: Pokemon;
  capitalizeFirstLetter: (string: string) => string;
  propotionsFixed: (value: number) => string;
}

const PokemonDetailedInformations: React.FC<PokemonDetailedInformationsProps> = ({
  pokemon,
  capitalizeFirstLetter,
  propotionsFixed,
}) => {
  return (
    <div className="pokemon-information-container">
      <span>
        <span className="pokemon-type-indicator">Types: </span>
        {pokemon.types.map((types) => (
          <span className={`pokemon-type ${types.type.name}`}>
            {capitalizeFirstLetter(types.type.name)}
          </span>
        ))}
      </span>

      <span className="pokemon-proportions">Height: {propotionsFixed(pokemon.height)} m</span>
      <span className="pokemon-proportions">
        Weight: {pokemon.weight === 10000 ? `??? kg` : `${propotionsFixed(pokemon.weight)} kg`}
      </span>
    </div>
  );
};

export default PokemonDetailedInformations;
