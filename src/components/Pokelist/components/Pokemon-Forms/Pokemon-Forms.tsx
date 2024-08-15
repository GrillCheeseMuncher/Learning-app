import { useEffect, useState } from 'react';
import { fetch_pokemon } from '../../../../API';
import { Pokemon, PokemonSpeciesWithEvolutionChain } from '../../../../API/types';
import './Pokemon-Forms.scss';

interface PokemonFormsProps {
  currentDisplayPokemon: Pokemon;
  pokemonSpecies: PokemonSpeciesWithEvolutionChain;
  capitalizeFirstLetter: (stat: string) => string;
  onFormClick: (variant: Pokemon) => void;
}

const PokemonForms: React.FC<PokemonFormsProps> = ({
  currentDisplayPokemon,
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
    'gumshoos',
    'salazzle',
    'togedemaru',
    'kommo-o',
    'araquanid',
    'lurantis',
  ];

  useEffect(() => {
    if (pokemonSpecies.varieties.length <= 1) {
      setVariants([]);
      return;
    }

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
    if (!variant || index < 0 || variant.name === currentDisplayPokemon.name) return null;

    const { pokemonName, pokemonFormName } = splitFormName(
      variant.name.replace('-gmax', '-gigantamax')
    );

    if (excludedVariants.includes(variant.name)) return null;

    if (variant.name.includes('-totem')) return null;

    const variantImage = variant.sprites.other['official-artwork'].front_default;

    if (!variantImage) return null;

    return (
      <div key={variant.id} className="pokelist-form" onClick={() => onFormClick(variant)}>
        <div className="pokelist-form-detailed">
          <div className="pokelist-form-image">
            <img src={variantImage} width="140" height="140" alt={pokemonFormName} />
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
