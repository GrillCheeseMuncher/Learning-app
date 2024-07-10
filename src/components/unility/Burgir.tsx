import { useState } from 'react';

export const Burgir = () => {

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      setIsClicked(!isClicked);
    };

  return (
    <div className={`burgir ${isClicked ? 'clicked' : ''}`} onClick={handleClick}>
    <div className="krecha_up"></div>
    <div className="krecha"></div>
    <div className="krecha_down"></div>
  </div>
  )
}
