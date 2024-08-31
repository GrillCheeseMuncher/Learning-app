import { fetch_pokedex } from './API';
import { PokedexIndexPokemon } from './API/types';
import './App.scss';
import { Header } from './components/Header/Header';
import { Login } from './components/Modals/Login/Login';
import { useEffect, useState } from 'react';
import { Pokelist } from './components/Pokelist/Pokelist';
import { pokedex_mapper } from './API/mappers';
import { Favorites } from './components/Favorites/Favorites';
import { Settings } from './components/Settings/Settings';

function App() {
  const [pokedex, setPokedex] = useState<PokedexIndexPokemon[]>([]);
  const [currentListId, setCurrentListId] = useState<number>(0);

  useEffect(() => {
    fetch_pokedex().then((res) => {
      const mapped_results = pokedex_mapper(res.results);
      setPokedex(mapped_results);
    });
  }, []);

  const handleCurrentListIdClick = (id: number) => {
    setCurrentListId(id);
  };

  const capitalizeFirstLetter = (string: string) => {
    return string
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  };

  const idConverter = (number: number) => {
    return `#${number.toString().padStart(4, '0')}`;
  };

  const modifiedPokemonName = (name: string): string => {
    let modifiedName = name.replace('-disguised', '');
    modifiedName = modifiedName.replace('-midday', '-midday-form');
    modifiedName = modifiedName.replace('-midnight', '-midnight-form');
    modifiedName = modifiedName.replace('-dusk', '-dusk-form');

    return modifiedName;
  };

  return (
    <div className="App">
      {/* <Login /> */}
      <Header currentlistid={currentListId} handleclick={handleCurrentListIdClick} />
      {currentListId === 0 && (
        <Pokelist
          pokedex={pokedex}
          setPokedex={setPokedex}
          capitalizeFirstLetter={capitalizeFirstLetter}
          idConverter={idConverter}
          modifiedPokemonName={modifiedPokemonName}
        />
      )}
      {currentListId === 1 && (
        <Favorites capitalizeFirstLetter={capitalizeFirstLetter} idConverter={idConverter} />
      )}
      {currentListId === 2 && <Settings />}
    </div>
  );
}

export default App;
