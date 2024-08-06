import { PokemonSpecies } from '../../../API/types';
import './PokemonForms.scss';

interface PokemonFormsProps {
  pokemonSpecies: PokemonSpecies;
  capitalizeFirstLetter: (stat: string) => string;
}

const PokemonForms: React.FC<PokemonFormsProps> = ({ pokemonSpecies, capitalizeFirstLetter }) => {
  if (pokemonSpecies.varieties.length <= 1) {
    return null;
  }

  const splitFormName = (name: string) => {
    const parts = name.split('-');
    const pokemonName = parts[0];
    const pokemonFormName = parts.slice(1).join(' ');
    return { pokemonName, pokemonFormName };
  };

  return (
    <div className="pokelist-forms-container">
      <div className="pokelist-forms-additional-text">Forms</div>
      <div className="pokelist-forms">
        {pokemonSpecies.varieties
          .filter((form, index) => index !== 0)
          .map((form) => {
            const { pokemonName, pokemonFormName } = splitFormName(
              form.pokemon.name.replace('-gmax', '-gigantamax')
            );
            return (
              <div className="pokelist-form">
                <div className="pokelist-form-detailed">
                  {capitalizeFirstLetter(pokemonName)}
                  <br />
                  {capitalizeFirstLetter(pokemonFormName)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PokemonForms;
