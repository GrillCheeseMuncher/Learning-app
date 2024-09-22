import React, { useEffect, useState } from 'react';
import { Card } from './components/Card/Card';
import './Favorites.scss';
import { PopupModal } from './components/PopupModal/PopupModal';
import FilterButton from '../FilterButton/FilterButton';
import { Pokemon } from '../../API/types';
import { fetch_pokemon } from '../../API';
import { DeletePopupModal } from './components/DeletePopupModal/DeletePopupModal';
import { ButtonFit } from '../utilities/ButtonFit/ButtonFit';

interface FavoritesProps {
  idConverter: (number: number) => string;
  capitalizeFirstLetter: (string: string) => string;
}

interface LikedLocalStorage {
  liked: number[];
}

export const Favorites = ({ idConverter, capitalizeFirstLetter }: FavoritesProps) => {
  const [likedPokemonIds, setLikedPokemonIds] = useState<number[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedPokemonId, setSelectedPokemonId] = useState<string | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false);
  const [pokemonFavName, setPokemonFavName] = useState<string>('');
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const likedStatus = localStorage.getItem('liked');

    if (likedStatus) {
      const likedStatusArray = (JSON.parse(likedStatus) as LikedLocalStorage).liked;
      setLikedPokemonIds(likedStatusArray);
      fetchPokemonDetails(likedStatusArray);
    } else {
      setLikedPokemonIds([]);
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [refresh]);

  useEffect(() => {
    if (pokemonFavName.startsWith('#')) {
      const id = parseInt(pokemonFavName.substring(1), 10);
      if (!isNaN(id)) {
        const pokemonListFilter = pokemonList
          .filter((item) => item.id === id)
          .map((item) => item.id);
        setLikedPokemonIds(pokemonListFilter);
      } else {
        setLikedPokemonIds([]);
      }
    } else {
      const pokemonListFilter = pokemonList
        .filter((item) =>
          item.name?.toLocaleLowerCase().includes(pokemonFavName.toLocaleLowerCase())
        )
        .map((item) => item.id);
      setLikedPokemonIds(pokemonListFilter);
    }
  }, [pokemonFavName, pokemonList]);

  const fetchPokemonDetails = async (ids: number[]) => {
    const pokemons = await Promise.all(ids.map((id) => fetch_pokemon(id.toString())));
    setPokemonList(pokemons.filter((pokemon): pokemon is Pokemon => pokemon !== undefined));
  };

  console.log(pokemonList);

  const handlePokemonNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonFavName(e.target.value);
  };

  const handleCardClick = (pokemonId: number) => {
    setSelectedPokemonId(pokemonId.toString());
    setPopupVisible(true);
  };

  const handleDeleteClick = () => {
    setDeletePopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
    setSelectedPokemonId(null);
  };

  const handleDeleteClosePopup = () => {
    setDeletePopupVisible(false);
  };

  const handleLetterSort = (alphabetical: boolean) => {
    const sortedPokemonList = [...pokemonList].sort((a, b) =>
      alphabetical ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setPokemonList(sortedPokemonList);
  };

  const handleNumberSort = (numerical: boolean) => {
    const sortedPokemonList = [...pokemonList].sort((a, b) =>
      numerical ? b.id - a.id : a.id - b.id
    );

    setPokemonList(sortedPokemonList);
  };

  return (
    <div className="favorite-body">
      <div className="pokelist-search-fav-container">
        <div className="pokelist-search-fav">
          <input
            placeholder={isMobile ? 'Search' : 'Search pokemon'}
            type="search"
            className="pokelist-search-fav-bar"
            value={pokemonFavName}
            onChange={handlePokemonNameChange}
          />
          <FilterButton
            handleLetterSort={handleLetterSort}
            handleNumberSort={handleNumberSort}
            horizontal={isMobile ? false : true}
          />
        </div>
        <div className="pokelist-search-fav-delete">
          <ButtonFit
            text={isMobile ? '✖' : 'Delete All'}
            onClick={handleDeleteClick}
            isMobile={isMobile}
          />
        </div>
      </div>
      <div className="cards-container">
        {likedPokemonIds.length > 0 ? (
          likedPokemonIds.map((pokemonId) => (
            <Card
              key={pokemonId}
              pokemonId={pokemonId + ''}
              idConverter={idConverter}
              capitalizeFirstLetter={capitalizeFirstLetter}
              handleRefresh={setRefresh}
              onClick={() => handleCardClick(pokemonId)}
            />
          ))
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
      {popupVisible && selectedPokemonId && (
        <PopupModal
          pokemonId={selectedPokemonId}
          idConverter={idConverter}
          capitalizeFirstLetter={capitalizeFirstLetter}
          onClose={handleClosePopup}
        />
      )}
      {deletePopupVisible && (
        <DeletePopupModal onClose={handleDeleteClosePopup} handleRefresh={setRefresh} />
      )}
    </div>
  );
};
