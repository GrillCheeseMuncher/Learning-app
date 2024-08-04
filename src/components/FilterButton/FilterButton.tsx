import { useEffect, useState } from 'react';
import './FilterButton.scss';

interface Props {
  handleLetterSort: (alphabetical: boolean) => void;
  handleNumberSort: (numerical: boolean) => void;
}

const FilterButton = ({ handleLetterSort, handleNumberSort }: Props) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isLetterSorted, setIsLetterSorted] = useState<boolean | undefined>(undefined);
  const [isNumberSorted, setIsNumberSorted] = useState<boolean | undefined>(undefined);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const pokeLetterSort = () => {
    setIsLetterSorted(!isLetterSorted);
    handleLetterSort(!isLetterSorted);
  };

  const pokeNumberSort = () => {
    setIsNumberSorted(!isNumberSorted);
    handleNumberSort(!isNumberSorted);
  };

  const alphabeticalOrder = isLetterSorted ? 'A-Z' : 'Z-A';

  const numberOrder = isNumberSorted ? '1-0' : '0-1';

  return (
    <div className="pokelist-dropdown">
      <button className="pokelist-filter-button" onClick={handleClick}>
        <svg viewBox="0 0 24 24" height="1rem" className="pokelist-filter-svg">
          <path d="M10 18h4v-2h-4v2zm-2-4h8v-2h-8v2zm-3-4h14v-2H5v2zm-2-6v2h18V4H3z" />
        </svg>
      </button>
      <div className={`pokelist-dropdown-content${isClicked ? ' show' : ''}`}>
        <button
          className="pokelist-filter-button pokelist-filter-button-dropdown"
          onClick={pokeLetterSort}
        >
          {alphabeticalOrder}
        </button>
        <button
          className="pokelist-filter-button pokelist-filter-button-dropdown"
          onClick={pokeNumberSort}
        >
          {numberOrder}
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
