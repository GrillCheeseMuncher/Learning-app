import { useEffect, useState } from 'react';
import { Pokemon } from '../../../../API/types';
import './Pokemon-Image.scss';

interface PokemonImageProps {
  pokemon: Pokemon;
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked-${pokemon.id}`);
    setIsLiked(likedStatus === 'true');
  }, [pokemon.id]);

  const handleLikeClick = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);
    localStorage.setItem(`liked-${pokemon.id}`, newLikedStatus.toString());
  };

  return (
    <div className="pokelist-description-image">
      <button className="like-button" onClick={handleLikeClick}>
        {isLiked ? '❤️' : '🤍'}
      </button>
      <img
        className="pokeimg"
        src={pokemon?.sprites.other['official-artwork'].front_default}
        width="300"
        height="300"
        alt={pokemon.name}
      />
    </div>
  );
};

export default PokemonImage;
