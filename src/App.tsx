import { fetch_pokedex } from './API';
import { PokedexIndexPokemon, PokedexPokemon } from './API/types';
import './App.scss';
import { Header } from './components/Header/Header';
import { Login } from './components/Modals/Login/Login';
import { useEffect, useState } from 'react';
import { Pokelist } from './components/Pokelist/Pokelist';
import { pokedex_mapper } from './API/mappers';

function App() {
  const [pokedex, setPokedex] = useState<PokedexIndexPokemon[]>([]);
  console.log(pokedex);

  useEffect(() => {
    fetch_pokedex().then((res) => {
      const mapped_results = pokedex_mapper(res.results);
      setPokedex(mapped_results);
    });
  }, []);

  return (
    <div className="App">
      {/* <Login /> */}
      <Header />
      <Pokelist pokedex={pokedex} setPokedex={setPokedex} />
    </div>
  );
}

export default App;
