import { useState } from 'react';
import { Burgir } from '../utilities';
import './Header.scss';

export const Header = () => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const list = ['HOME', 'PROFILE', 'INVITES', 'SETTINGS', 'LOG OUT'].map((item, i) => (
    <li key={i} className="menu_li">
      {item}
    </li>
  ));

  return (
    <header className="header">
      <div className="title_wrapper">
        <div className="title">Wedding app</div>
        <Burgir isClicked={isClicked} handleClick={handleClick} />
      </div>
      <nav className={`menu${isClicked ? ' show' : ''}`}>{list}</nav>
    </header>
  );
};
