import { PokemonSpecies, Pokemon } from '../../../API/types';
import './PokemonBreeding.scss';

interface PokemonBreedingsProps {
  pokemonSpecies: PokemonSpecies;
  pokemon: Pokemon;
  capitalizeFirstLetter: (stat: string) => string;
}

const PokemonBreeding: React.FC<PokemonBreedingsProps> = ({
  pokemonSpecies,
  pokemon,
  capitalizeFirstLetter,
}) => {
  const renderEggGroups = () => {
    return pokemonSpecies.egg_groups.map((eggGroup) => {
      const eggGroupName =
        eggGroup.name === 'water1'
          ? 'water 1'
          : eggGroup.name === 'water2'
          ? 'water 2'
          : eggGroup.name;
      return <span key={eggGroup.name}>{capitalizeFirstLetter(eggGroupName)}</span>;
    });
  };

  return (
    <div className="pokelist-breeding-container">
      <div className="pokelist-breeding-additional-text">Breeding</div>
      <div className="pokelist-breeding-informations-container">
        <div className="breeding">
          <span className="breeding-information-name">Gender Ratio</span>
          <span>{pokemonSpecies.gender_rate}</span>
        </div>
        <div className="breeding">
          <span className="breeding-information-name">Catch Rate</span>
          <span>{pokemonSpecies.capture_rate}</span>
        </div>
        <div className="right-down breeding">
          <span className="breeding-information-name">Egg Groups</span>
          <span className="egg-groups">{renderEggGroups()}</span>
        </div>
        <div className="left-down breeding">
          <span className="breeding-information-name">Hatch Time</span>
          <span>{pokemonSpecies.hatch_counter} cycles</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonBreeding;
