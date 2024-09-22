import FilterButton from '../FilterButton/FilterButton';
import './SearchBar.scss';

interface SearchbarProps {
  pokemonName: string;
  handlePokemonNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLetterSort: (alphabetical: boolean) => void;
  handleNumberSort: (numerical: boolean) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({
  pokemonName,
  handlePokemonNameChange,
  handleLetterSort,
  handleNumberSort,
}) => {
  return (
    <div className="pokelist-search">
      <input
        placeholder="Search pokemon"
        type="search"
        className="pokelist-search-bar"
        value={pokemonName}
        onChange={handlePokemonNameChange}
      />
      <FilterButton handleLetterSort={handleLetterSort} handleNumberSort={handleNumberSort} />
    </div>
  );
};

export default Searchbar;
