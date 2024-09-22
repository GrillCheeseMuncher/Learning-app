import { useEffect, useState } from 'react';
import './PopupModal.scss';
import { Pokemon, PokemonSpeciesWithEvolutionChain } from '../../../../API/types';
import { fetch_pokemon, fetch_pokemon_species } from '../../../../API';
import PokemonImage from '../../../Pokelist/components/Pokemon-Image/Pokemon-Image';
import PokemonNametag from '../../../Pokelist/components/Pokemon-Nametag/Pokemon-Nametag';
import PokemonDetailedInformations from '../../../Pokelist/components/Pokemon-Detailed-Informations/Pokemon-Detailed-Informations';
import PokemonStats from '../../../Pokelist/components/Pokemon-Stats/Pokemon-Stats';
import PokemonLessImportantInformations from '../../../Pokelist/components/Pokemon-Less-Important-Informations/Pokemon-Less-Important-Informations';
import { Loader } from '../../../utilities/Loader/Loader';

interface PopupModalProps {
  pokemonId: string;
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
  onClose: () => void;
}

export const PopupModal = ({
  pokemonId,
  idConverter,
  capitalizeFirstLetter,
  onClose,
}: PopupModalProps) => {
  const [popupPokemonInfo, setPopupPokemonInfo] = useState<Pokemon | undefined>(undefined);
  const [popupPokemonInfoId, setPopupPokemonInfoInfoId] = useState<number | undefined>(undefined);
  const [popupPokemonSpeciesInfo, setPopupPokemonSpeciesInfoInfo] = useState<
    PokemonSpeciesWithEvolutionChain | undefined
  >(undefined);

  useEffect(() => {
    if (!pokemonId) return;

    fetch_pokemon(pokemonId).then((res) => {
      setPopupPokemonInfo(res);
      const sliceUrl = res?.species.url.split('/').at(-2);

      setPopupPokemonInfoInfoId(sliceUrl ? +sliceUrl : undefined);
    });
  }, [pokemonId]);

  useEffect(() => {
    if (!popupPokemonInfoId) return;

    fetch_pokemon_species(popupPokemonInfoId).then((res) => {
      setPopupPokemonSpeciesInfoInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popupPokemonInfo]);

  if (!popupPokemonInfo) return null;

  const propotionsFixed = (value: number) => (value / 10).toFixed(1);

  const abbreviationConverter = (stat: string) => {
    const stats: { [key: string]: string } = {
      attack: 'Atk',
      defense: 'Def',
      'special-attack': 'SpA',
      'special-defense': 'SpD',
      speed: 'Spe',
      hp: 'HP',
    };
    return stats[stat];
  };

  const extraComponent = (
    <PokemonNametag
      pokemon={popupPokemonInfo}
      capitalizeFirstLetter={capitalizeFirstLetter}
      idConverter={idConverter}
      displayedPokemonName={popupPokemonInfo.name || ''}
    />
  );

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="close-button" onClick={onClose}>
          ❌
        </div>
        <div className="pokelist-description-left-container">
          <PokemonImage pokemon={popupPokemonInfo} />
          <div className="pokelist-description-information">
            {popupPokemonSpeciesInfo ? (
              <div className="information-container">
                <div className="information-sub-container">
                  <PokemonDetailedInformations
                    pokemon={popupPokemonInfo}
                    pokemonSpecies={popupPokemonSpeciesInfo}
                    capitalizeFirstLetter={capitalizeFirstLetter}
                    propotionsFixed={propotionsFixed}
                    extraComponent={extraComponent}
                  />
                </div>
                <div className="information-sub-container">
                  <PokemonStats
                    pokemon={popupPokemonInfo}
                    abbreviationConverter={abbreviationConverter}
                    pokemonSpecies={popupPokemonSpeciesInfo}
                  />
                  <PokemonLessImportantInformations
                    pokemonSpecies={popupPokemonSpeciesInfo}
                    capitalizeFirstLetter={capitalizeFirstLetter}
                  />
                </div>
              </div>
            ) : (
              <div className="loader-wrapper">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
