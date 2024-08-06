import { Pokemon } from '../../../API/types';
import './PokemonNametag.scss';

interface PokemonNametagProps {
  pokemon: Pokemon;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
}

const PokemonNametag: React.FC<PokemonNametagProps> = ({
  pokemon,
  capitalizeFirstLetter,
  idConverter,
}) => {
  return (
    <div className="pokemon-name-container">
      <div className="pokemon-name">{capitalizeFirstLetter(pokemon.name)} </div>
      <div className="pokemon-id">{pokemon.id < 10000 ? idConverter(pokemon.id) : ''}</div>
    </div>
  );
};

export default PokemonNametag;
