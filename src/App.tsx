import './App.scss';
import { useState } from 'react';
import { Burgir } from './components/unility/Burgir';

function App() {

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="App">
      <nav className='header'>
        <div className='logo'>Wedding app</div>
        <Burgir isClicked={isClicked} handleClick={handleClick} />
      </nav>
        <div className={`menu ${isClicked ? 'show' : ''}`}>
            <li><a href="#home">HOME</a></li>
            <li><a href="#profile">PROFILE</a></li>
            <li><a href="#invites">INVITES</a></li>
            <li><a href="#settings">SETTINGS</a></li>
            <li><a href="#logout">LOG OUT</a></li>
        </div>
    </div>
  );
}

export default App;