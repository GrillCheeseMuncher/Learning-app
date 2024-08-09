import { Pokemon } from '../../../../API/types';
import './Pokemon-Nametag.scss';

interface PokemonNametagProps {
  pokemon: Pokemon;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
  displayedPokemonName: string;
}

const PokemonNametag: React.FC<PokemonNametagProps> = ({
  pokemon,
  capitalizeFirstLetter,
  idConverter,
  displayedPokemonName,
}) => {
  return (
    <div
      className={pokemon.id < 10000 ? `pokemon-name-container` : `pokemon-name-variant-container`}
    >
      <div className="pokemon-name">{capitalizeFirstLetter(displayedPokemonName)}</div>
      <div className="pokemon-id">{pokemon.id < 10000 ? idConverter(pokemon.id) : ''}</div>
    </div>
  );
};

export default PokemonNametag;
