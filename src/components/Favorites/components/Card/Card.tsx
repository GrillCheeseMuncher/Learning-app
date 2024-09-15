import React, { useEffect, useState } from 'react';
import { fetch_pokemon } from '../../../../API';
import { Pokemon } from '../../../../API/types';
import './Card.scss';
import { LikedLocalStorage } from '../../../Pokelist/components/Pokemon-Image/Pokemon-Image';

enum PokemonTypeColor {
  normal = '#828282',
  grass = '#439937',
  fire = '#e5613e',
  water = '#309ae2',
  electric = '#e0bd28',
  rock = '#aaa581',
  fighting = '#e59121',
  psychic = '#ea6c8d',
  ghost = '#6f4570',
  poison = '#9454cc',
  flying = '#74abd1',
  ground = '#a5733c',
  dragon = '#576fbd',
  ice = '#47c9c9',
  bug = '#a0a028',
  steel = '#6badc9',
  dark = '#4f4747',
  fairy = '#e28de2',
}

interface CardProps {
  pokemonId: string;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
  handleRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

export const Card = ({
  pokemonId,
  idConverter,
  capitalizeFirstLetter,
  handleRefresh,
  onClick,
}: CardProps) => {
  const [cardInfo, setCardInfo] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    fetch_pokemon(pokemonId).then((res) => {
      setCardInfo(res);
    });
  }, []);

  const handleLikeClick = () => {
    const likedStatus = localStorage.getItem('liked');

    const likedStatusArray: number[] = likedStatus
      ? (JSON.parse(likedStatus) as LikedLocalStorage).liked
      : [];

    const filteredArray = likedStatusArray.filter((id) => cardInfo?.id !== id);
    localStorage.setItem('liked', JSON.stringify({ liked: filteredArray }));
    handleRefresh((refresh) => !refresh);
  };

  if (!cardInfo) return null;

  const firstType = cardInfo.types[0].type.name as keyof typeof PokemonTypeColor;
  const secondType = (cardInfo.types[1]?.type.name as keyof typeof PokemonTypeColor) || '';

  const buildBackgroudColor = (
    firstType: keyof typeof PokemonTypeColor,
    secondType: keyof typeof PokemonTypeColor | ''
  ) => {
    if (firstType && secondType) {
      return {
        background: `linear-gradient(45deg, ${PokemonTypeColor[firstType]} 50%, ${PokemonTypeColor[secondType]} 50%)`,
      };
    } else return { backgroundColor: PokemonTypeColor[firstType] };
  };

  return (
    <div className="card-container">
      <button className="like-button" onClick={handleLikeClick}>
        ❌
      </button>
      <div className="card-image-container" onClick={onClick}>
        <div className="card-image-sub-container">
          <div
            className={`card-image-background`}
            style={buildBackgroudColor(firstType, secondType)}
          >
            <img
              className="card-image"
              src={cardInfo.sprites.other['official-artwork'].front_default}
              alt={cardInfo.name}
            />
          </div>
        </div>
      </div>
      <div className="card-sub-container">
        <div className="card-tittle">
          <span className="card-name">
            <span className="card-name-content">{capitalizeFirstLetter(cardInfo.name)}</span>
          </span>
          <span className="card-id">{idConverter(cardInfo.id)}</span>
        </div>
        <div className="card-types">
          {cardInfo.types.map((types) => (
            <span
              key={types.type.name}
              className={`card-type`}
              style={buildBackgroudColor(types.type.name as keyof typeof PokemonTypeColor, '')}
            >
              {capitalizeFirstLetter(types.type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
