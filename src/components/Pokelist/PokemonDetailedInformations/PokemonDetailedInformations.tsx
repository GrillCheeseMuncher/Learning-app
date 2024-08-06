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
      <div className="pokemon-type-information-container">
        <div className="pokemon-type-additional-text">Types: </div>
        <div className="pokemon-type-container">
          {pokemon.types.map((types) => (
            <span className={`pokemon-type ${types.type.name}`}>
              {capitalizeFirstLetter(types.type.name)}
            </span>
          ))}
        </div>
      </div>

      <div className="pokemon-all-proportions-container">
        <div className="pokemon-proportions-container height">
          <span>{propotionsFixed(pokemon.height)} m</span>
          <span className="propotions-information-name">Height</span>
        </div>
        <div className="pokemon-proportions-container weight">
          <span>
            {pokemon.weight === 10000 ? `??? kg` : `${propotionsFixed(pokemon.weight)} kg`}
          </span>
          <span className="propotions-information-name">Weight</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailedInformations;
