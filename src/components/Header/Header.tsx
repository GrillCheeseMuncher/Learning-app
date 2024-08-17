import { useState } from 'react';
import { Burgir } from '../utilities';
import './Header.scss';

interface ListName {
  name: string;
  id: number;
}

const listNames: ListName[] = [
  { name: 'POKELIST', id: 1 },
  { name: 'FAVORITES', id: 2 },
  { name: 'SETTINGS', id: 3 },
];

export const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [currentListId, setCurrentListId] = useState<number>(1);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const list = listNames.map((item) => {
    const handleListClick = () => {
      setCurrentListId(item.id);
    };

    return (
      <li
        key={item.id}
        className={`menu_li${currentListId === item.id ? ' active' : ''}`}
        onClick={handleListClick}
      >
        {item.name}
      </li>
    );
  });

  return (
    <header className="header">
      <div className="title_wrapper">
        <div className="title">Pokedex</div>
        <Burgir isBurgirClicked={isClicked} handleBurgirClick={handleClick} />
      </div>
      <nav className={`menu${isClicked ? ' show' : ''}`}>{list}</nav>
    </header>
  );
};
