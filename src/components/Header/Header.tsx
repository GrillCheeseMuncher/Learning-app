import { useState } from 'react';
import { Burgir } from '../utilities';
import './Header.scss';

interface ListName {
  name: string;
  id: number;
}

interface HeaderProps {
  currentlistid: number;
  handleclick: (id: number) => void;
}

const listNames: ListName[] = [
  { name: 'POKELIST', id: 0 },
  { name: 'FAVORITES', id: 1 },
  { name: 'SETTINGS', id: 2 },
];

export const Header = ({ currentlistid, handleclick }: HeaderProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const list = listNames.map((item) => {
    const handleListClick = () => {
      handleclick(item.id);
    };

    return (
      <li
        key={item.id}
        className={`menu_li${currentlistid === item.id ? ' active' : ''}`}
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
