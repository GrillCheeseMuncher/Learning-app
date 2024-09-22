import { PokemonSpeciesWithEvolutionChain } from '../../../../API/types';
import './Pokemon-Breeding.scss';
import './Pokemon-Breeding-Fixed.scss';

interface PokemonBreedingsProps {
  pokemonSpecies: PokemonSpeciesWithEvolutionChain;
  capitalizeFirstLetter: (stat: string) => string;
}

const PokemonBreeding: React.FC<PokemonBreedingsProps> = ({
  pokemonSpecies,
  capitalizeFirstLetter,
}) => {
  const genderRatioConverter = () => {
    const ratio = pokemonSpecies.gender_rate;

    if (ratio === 4)
      return (
        <div className="gender-ratio-container one-to-one">
          <span className="pokemon-female">50%</span>
          <span className="pokemon-male">50%</span>
        </div>
      );
    if (ratio === 2)
      return (
        <div className="gender-ratio-container one-to-three">
          <span className="pokemon-female">25%</span>
          <span className="pokemon-male">75%</span>
        </div>
      );
    if (ratio === 6)
      return (
        <div className="gender-ratio-container three-to-one">
          <span className="pokemon-female">75%</span>
          <span className="pokemon-male">25%</span>
        </div>
      );
    if (ratio === 1)
      return (
        <div className="gender-ratio-container one-to-seven">
          <span className="pokemon-female">12.5%</span>
          <span className="pokemon-male">87.5%</span>
        </div>
      );
    if (ratio === 7)
      return (
        <div className="gender-ratio-container seven-to-one">
          <span className="pokemon-female">87.5%</span>
          <span className="pokemon-male">12.5%</span>
        </div>
      );
    if (ratio === 8)
      return (
        <div className="gender-ratio-container">
          <span className="pokemon-one-gender female-only">Female only</span>
        </div>
      );
    if (ratio === 0)
      return (
        <div className="gender-ratio-container">
          <span className="pokemon-one-gender male-only">Male only</span>
        </div>
      );
    if (ratio === -1)
      return (
        <div className="gender-ratio-container">
          <span className="pokemon-one-gender gender-unknown">Gender unknown</span>
        </div>
      );

    return 'Unknown ratio';
  };

  const eggGroupsConverter = () => {
    return pokemonSpecies.egg_groups.map((eggGroup, index) => {
      const eggGroupName =
        eggGroup.name === 'humanshape'
          ? 'human-like'
          : eggGroup.name === 'water1'
          ? 'water 1'
          : eggGroup.name === 'water3'
          ? 'water 3'
          : eggGroup.name === 'indeterminate'
          ? 'amorphous'
          : eggGroup.name === 'ground'
          ? 'field'
          : eggGroup.name === 'water2'
          ? 'water 2'
          : eggGroup.name === 'plant'
          ? 'grass'
          : eggGroup.name === 'no-eggs'
          ? 'undiscovered'
          : eggGroup.name;
      return (
        <span key={index} className={`single-egg-group ${eggGroup.name}`}>
          {capitalizeFirstLetter(eggGroupName)}
        </span>
      );
    });
  };

  return (
    <div className="pokelist-breeding-container">
      <div className="pokelist-breeding-additional-text">Breeding</div>
      <div className="pokelist-breeding-informations-container">
        <div className="breeding">
          <span className="breeding-information-name">Gender Ratio</span>
          <span>{genderRatioConverter()}</span>
        </div>
        <div className="breeding">
          <span className="breeding-information-name">Catch Rate</span>
          <span className="pokemon-breeding-white-box-container">
            <span className="pokemon-breeding-white-box">{pokemonSpecies.capture_rate}</span>
          </span>
        </div>
        <div className="right-down breeding">
          <span className="breeding-information-name">Egg Groups</span>
          <span className="egg-groups">{eggGroupsConverter()}</span>
        </div>
        <div className="left-down breeding">
          <span className="breeding-information-name">Hatch Time</span>
          <span className="pokemon-breeding-white-box-container">
            <span className="pokemon-breeding-white-box">
              {pokemonSpecies.hatch_counter} cycles
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PokemonBreeding;
