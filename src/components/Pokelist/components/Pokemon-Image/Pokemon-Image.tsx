import { useEffect, useState } from 'react';
import { Pokemon } from '../../../../API/types';
import './Pokemon-Image.scss';

interface PokemonImageProps {
  pokemon: Pokemon;
}

export interface LikedLocalStorage {
  liked: number[];
}

const PokemonImage: React.FC<PokemonImageProps> = ({ pokemon }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    const likedStatus = localStorage.getItem(`liked`);
    if (!likedStatus) return;

    const likedStatusArray = (JSON.parse(likedStatus) as LikedLocalStorage).liked;

    if (likedStatusArray) {
      setIsLiked(likedStatusArray.some((id) => id === pokemon.id));
    }
  }, [pokemon.id]);

  const handleLikeClick = () => {
    const newLikedStatus = !isLiked;
    setIsLiked(newLikedStatus);

    const likedStatus = localStorage.getItem(`liked`);
    let likedStatusArray: number[] = [];

    if (likedStatus) {
      likedStatusArray = (JSON.parse(likedStatus) as LikedLocalStorage).liked;
    }

    if (newLikedStatus) {
      localStorage.setItem('liked', JSON.stringify({ liked: [...likedStatusArray, pokemon.id] }));
    } else {
      const filteredArray: number[] = likedStatusArray.filter((id) => pokemon.id !== id);
      localStorage.setItem('liked', JSON.stringify({ liked: filteredArray }));
    }
  };

  return (
    <div className="pokelist-description-image">
      <button className="like-button" onClick={handleLikeClick}>
        {isLiked ? '❤️' : '🤍'}
      </button>
      <img
        className="pokeimg"
        src={pokemon?.sprites.other['official-artwork'].front_default}
        width="200"
        height="200"
        alt={pokemon.name}
      />
    </div>
  );
};

export default PokemonImage;
