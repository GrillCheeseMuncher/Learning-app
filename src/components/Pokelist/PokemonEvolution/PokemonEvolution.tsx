import { PokemonSpecies } from '../../../API/types';
import './PokemonEvolution.scss';

interface PokemonEvolutionProps {
  pokemonSpecies: PokemonSpecies;
  capitalizeFirstLetter: (stat: string) => string;
}

const PokemonEvolution: React.FC<PokemonEvolutionProps> = ({
  pokemonSpecies,
  capitalizeFirstLetter,
}) => {
  return (
    <div className="pokelist-evolution-container">
      <div className="pokelist-evolution-additional-text">Evolution Chain</div>
      <div className="pokelist-evolution-chain">
        {pokemonSpecies?.evolves_from_species?.name ? (
          <div className="pokelist-evolution-chain">
            {capitalizeFirstLetter(pokemonSpecies.evolves_from_species.name)}
          </div>
        ) : (
          <div className="pokelist-evolution-chain">No evolution source</div>
        )}
      </div>
    </div>
  );
};

export default PokemonEvolution;
