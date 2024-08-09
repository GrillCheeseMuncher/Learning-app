import { NamedAPIResource, PokemonAbilities as PokemonAbility } from '../../../API/types';
import './PokemonAbilities.scss';

interface PokemonAbilitiesProps {
  abilities: PokemonAbility[];
  capitalizeFirstLetter: (string: string) => string;
}

const PokemonAbilities: React.FC<PokemonAbilitiesProps> = ({
  abilities,
  capitalizeFirstLetter,
}) => {
  const uniqueAbilities = abilities.filter(
    (ability, index, self) =>
      index === self.findIndex((a) => a.ability.name === ability.ability.name)
  );

  return (
    <div className="pokelist-description-right-container-abilities">
      <div className="pokelist-abilities-additional-text">Abilities</div>
      <div className="pokelist-abilities-in-container">
        {uniqueAbilities.map((ability) => (
          <li
            key={ability.ability.name}
            className={`pokelist-each-ability${ability.is_hidden ? ' hidden' : ''}`}
          >
            {capitalizeFirstLetter(ability.ability.name)}
          </li>
        ))}
      </div>
    </div>
  );
};

export default PokemonAbilities;
