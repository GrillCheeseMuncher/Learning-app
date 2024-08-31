import React, { useEffect, useState } from 'react';
import { fetch_pokemon } from '../../../../API';
import { Pokemon } from '../../../../API/types';
import './Card.scss';
import './Card-Fixed.scss';

interface CardProps {
  pokemonId: string;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
}

export const Card = ({ pokemonId, idConverter, capitalizeFirstLetter }: CardProps) => {
  const [cardInfo, setCardInfo] = useState<Pokemon | undefined>(undefined);
  console.log('cardInfo', cardInfo);

  useEffect(() => {
    fetch_pokemon(pokemonId).then((res) => {
      setCardInfo(res);
    });
  }, []);

  if (!cardInfo) return null;

  const firstType = cardInfo.types[0].type.name;
  const secondType = cardInfo.types[1]?.type.name || '';
  const className = secondType ? `${firstType} ${secondType}` : firstType;

  return (
    <div className="card-container">
      <div className="card-image-container">
        <div className="card-image-sub-container">
          <div className={`card-image-background ${className}`}>
            <img
              className="card-image"
              src={cardInfo.sprites.other['official-artwork'].front_default}
              alt={cardInfo.name}
              width="fit-content"
              height="fit-content"
            />
          </div>
        </div>
      </div>
      <div className="card-sub-container">
        <div className="card-tittle">
          <span className="card-name">{capitalizeFirstLetter(cardInfo.name)}</span>
          <span className="card-id">{idConverter(cardInfo.id)}</span>
        </div>
        <div className="card-types">
          {cardInfo.types.map((types) => (
            <span key={types.type.name} className={`card-type ${types.type.name}`}>
              {capitalizeFirstLetter(types.type.name)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
