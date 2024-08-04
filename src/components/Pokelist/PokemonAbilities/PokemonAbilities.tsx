import { Pokemon } from '../../../API/types';
import './PokemonAbilities.scss';

export interface PokemonAbilitiesProps {
  pokemon: Pokemon;
  capitalizeFirstLetter: (string: string) => string;
}

const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({ pokemon, capitalizeFirstLetter }) => {
  return (
    <div className="pokelist-description-right-container-abilities">
      <div className="pokelist-abilities-additional-text">Abilities</div>
      <div className="pokelist-abilities-in-container">
        {pokemon.abilities.map((ability) => (
          <li
            key={ability.ability.name}
            className={`pokelist-each-ability${pokemon.abilities.length < 3 ? ' three' : ''} ${
              ability.is_hidden ? ' hidden' : ''
            }`}
          >
            {capitalizeFirstLetter(ability.ability.name)}
          </li>
        ))}
      </div>
    </div>
  );
};

export default PokemonAbilities;
