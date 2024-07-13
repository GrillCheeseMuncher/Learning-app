import './App.scss';
import { Header } from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
        <div className="loader">
          <div className="loader-smol"></div>
        </div>
        <button className='guzior'>GUZIOR</button>
    </div>
  );
}

export default App;
