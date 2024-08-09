import { useEffect, useState } from 'react';
import { fetch_pokemon } from '../../../API';
import { Pokemon, PokemonSpecies } from '../../../API/types';
import './PokemonForms.scss';

interface PokemonFormsProps {
  pokemonSpecies: PokemonSpecies;
  capitalizeFirstLetter: (stat: string) => string;
  onFormClick: (variant: Pokemon) => void;
}

const PokemonForms: React.FC<PokemonFormsProps> = ({
  pokemonSpecies,
  capitalizeFirstLetter,
  onFormClick,
}) => {
  const [variants, setVariants] = useState<(Pokemon | undefined)[]>([]);

  const excludedVariants = [
    'pikachu-rock-star',
    'pikachu-belle',
    'pikachu-pop-star',
    'pikachu-phd',
    'pikachu-libre',
    'pikachu-hoenn-cap',
    'pikachu-sinnoh-cap',
    'pikachu-unova-cap',
    'pikachu-kalos-cap',
    'pikachu-alola-cap',
    'pikachu-partner-cap',
    'pikachu-world-cap',
    'koraidon',
    'miraidon',
    'ribombee',
    'vikavolt',
    'mimikyu-disguised',
    'lurantis',
    'wishiwashi',
    'gumshoos',
    'marowak',
    'salazzle',
    'togedemaru',
    'kommo-o',
    'araquanid',
    'raticate',
    'lurantis',
  ];

  useEffect(() => {
    const fetchVariants = async () => {
      const responses = await Promise.all(
        pokemonSpecies.varieties.map((variant) => fetch_pokemon(variant.pokemon.name))
      );
      return responses;
    };

    fetchVariants().then((results) => setVariants(results));
  }, [pokemonSpecies]);

  if (pokemonSpecies.varieties.length <= 1) return null;

  const splitFormName = (name: string) => {
    const parts = name.split('-');
    const pokemonName = parts[0];
    const pokemonFormName = parts.slice(1).join(' ');

    return { pokemonName, pokemonFormName };
  };

  const variantsList = variants.map((variant, index) => {
    if (!variant || index < 0) return null;

    const { pokemonName, pokemonFormName } = splitFormName(
      variant.name.replace('-gmax', '-gigantamax')
    );

    if (excludedVariants.includes(variant.name)) {
      return null;
    }

    if (variant.name.includes('-totem')) {
      return null;
    }

    const imageUrl = variant.sprites.other['official-artwork'].front_default;

    if (!imageUrl) return null;

    return (
      <div key={variant.id} className="pokelist-form" onClick={() => onFormClick(variant)}>
        <div className="pokelist-form-detailed">
          <div className="pokelist-form-image">
            <img
              src={variant.sprites.other['official-artwork'].front_default}
              width="140"
              height="140"
            />
          </div>
          <span>{capitalizeFirstLetter(pokemonName)}</span>
          <span>{capitalizeFirstLetter(pokemonFormName)}</span>
        </div>
      </div>
    );
  });

  const filteredVariantsList = variantsList.filter(Boolean);

  if (filteredVariantsList.length === 0) return null;

  return (
    <div className="pokelist-forms-container">
      <div className="pokelist-forms-additional-text">Forms</div>
      <div className="pokelist-forms">{variantsList}</div>
    </div>
  );
};

export default PokemonForms;
