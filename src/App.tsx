import { fetch_pokedex } from './API';
import { PokedexPokemon } from './API/types';
import './App.scss';
import { Header } from './components/Header/Header';
import { Login } from './components/Modals/Login/Login';
import { useEffect, useState } from 'react';
import { Pokelist } from './components/Pokelist/Pokelist';

function App() {
  const [pokedex, setPokedex] = useState<PokedexPokemon[]>([]);
  useEffect(() => {
    fetch_pokedex().then((res) => setPokedex(res.results));
  }, []);

  return (
    <div className="App">
      {/* <Login /> */}
      <Header />
      <Pokelist pokedex={pokedex} />
    </div>
  );
}

export default App;
