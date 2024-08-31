import React, { useEffect, useState } from 'react';
import { Card } from './components/Card/Card';
import './Favorites.scss';

interface FavoritesProps {
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
}

interface LikedLocalStorage {
  liked: number[];
}

export const Favorites = ({ idConverter, capitalizeFirstLetter }: FavoritesProps) => {
  const [likedPokemonIds, setLikedPokemonIds] = useState<number[]>([]);

  useEffect(() => {
    const likedStatus = localStorage.getItem('liked');
    if (likedStatus) {
      const likedStatusArray = (JSON.parse(likedStatus) as LikedLocalStorage).liked;
      setLikedPokemonIds(likedStatusArray);
    }
  }, []);

  return (
    <div className="favorite-body">
      <div className="cards-container">
        {likedPokemonIds.length > 0 ? (
          likedPokemonIds.map((pokemonId) => (
            <Card
              key={pokemonId}
              pokemonId={pokemonId + ''}
              idConverter={idConverter}
              capitalizeFirstLetter={capitalizeFirstLetter}
            />
          ))
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
    </div>
  );
};
