import { Pokemon } from '../../../../API/types';
import './Pokemon-Image.scss';

interface PokemonImageProps {
  pokemon: Pokemon;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  return (
    <div className="pokelist-description-image">
      <img
        src={pokemon?.sprites.other['official-artwork'].front_default}
        width="300"
        height="300"
      />
    </div>
  );
};

export default PokemonImage;
