import { PokemonSpecies } from '../../../API/types';
import './PokemonLessImportantInformations.scss';

interface PokemonLessImportantInformationsPropos {
  pokemonSpecies: PokemonSpecies;
  capitalizeFirstLetter: (stat: string) => string;
}

const PokemonLessImportantInformations: React.FC<PokemonLessImportantInformationsPropos> = ({
  pokemonSpecies,
  capitalizeFirstLetter,
}) => {
  const shapeImageConverter = () => {
    const shape = pokemonSpecies.shape.name;
    const shapeImages: { [key: string]: any } = {
      ball: require('../../../img/PokemonShapes/Shape01.png'),
      squiggle: require('../../../img/PokemonShapes/Shape02.png'),
      fish: require('../../../img/PokemonShapes/Shape03.png'),
      arms: require('../../../img/PokemonShapes/Shape04.png'),
      blob: require('../../../img/PokemonShapes/Shape05.png'),
      upright: require('../../../img/PokemonShapes/Shape06.png'),
      legs: require('../../../img/PokemonShapes/Shape07.png'),
      quadruped: require('../../../img/PokemonShapes/Shape08.png'),
      wings: require('../../../img/PokemonShapes/Shape09.png'),
      tentacles: require('../../../img/PokemonShapes/Shape10.png'),
      heads: require('../../../img/PokemonShapes/Shape11.png'),
      humanoid: require('../../../img/PokemonShapes/Shape12.png'),
      'bug-wings': require('../../../img/PokemonShapes/Shape13.png'),
      armor: require('../../../img/PokemonShapes/Shape14.png'),
    };

    return shapeImages[shape] ? (
      <img src={shapeImages[shape]} width="32" height="32" alt={shape} />
    ) : (
      'Unknown'
    );
  };

  return (
    <div className="less-important-informations">
      <div className="pokemon-less-important-container shape">
        <span className="pokemon-less-text">Shape</span>
        <div className={pokemonSpecies.shape ? '' : 'pokemon-small-white-box'}>
          {pokemonSpecies.shape ? shapeImageConverter() : 'Unknown'}
        </div>
      </div>
      <div className="pokemon-less-important-container footprint">
        <span className="pokemon-less-text">Habitat</span>
        <span className="pokemon-small-white-box">
          {pokemonSpecies.habitat ? capitalizeFirstLetter(pokemonSpecies.habitat.name) : 'Unknown'}
        </span>
      </div>
      <div className="pokemon-less-important-container pokedex-color">
        <span className="pokemon-less-text">Pokedex color</span>
        <span className={`pokemon-color ${pokemonSpecies.color.name}`}>
          {capitalizeFirstLetter(pokemonSpecies.color.name)}
        </span>
      </div>
      <div className="pokemon-less-important-container happiness">
        <span className="pokemon-less-text">Base friendship</span>
        <span className="pokemon-small-white-box">
          {pokemonSpecies.base_happiness ? pokemonSpecies.base_happiness : 'Unknown'}
        </span>
      </div>
    </div>
  );
};

export default PokemonLessImportantInformations;
