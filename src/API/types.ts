export interface PokedexApiResponse {
  count: number;
  next: unknown;
  previous: unknown;
  results: PokedexPokemon[];
}

export interface PokedexPokemon {
  name: string;
  url: string;
}

export interface PokedexIndexPokemon extends PokedexPokemon {
  id: number;
}

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: PokemonAbilities[];
  forms: PokemonForms[];
  game_indices: VersionGameIndex[];
  held_items: PokemonHeldItem[];
  location_area_encounters: string;
  moves: PokemonMove[];
  past_types: PokemonTypePast[];
  sprites: PokemonSprites;
  cries: PokemonCries;
  species: NamedAPIResource;
  stats: PokemonStat[];
  types: PokemonType[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface PokemonAbilities {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
}

export interface PokemonForms extends NamedAPIResource {}

export interface VersionGameIndex {
  game_index: number;
  version: NamedAPIResource;
}

export interface PokemonHeldItem {
  item: NamedAPIResource;
  version_details: {
    version: NamedAPIResource;
    rarity: number;
  };
}

export interface PokemonMove {
  move: NamedAPIResource;
  version_group_details: {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    NamedAPIResource: number;
  };
}

export interface PokemonTypePast {
  generation: NamedAPIResource;
  types: PokemonType;
}

export interface PokemonSprites {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string;
      front_female: string | null;
    };
    home: {
      front_default: string;
      front_female: string | null;
      front_shiny: string;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      front_default: string;
      front_shiny: string;
      front_female: string | null;
      front_shiny_female: string | null;
      back_default: string;
      back_shiny: string;
      back_female: string | null;
      back_shiny_female: string | null;
    };
  };
}

export interface PokemonCries {
  latest: string;
  legacy: string;
}

export interface PokemonStat {
  stat: NamedAPIResource;
  effort: number;
  base_stat: number;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
  entry_number: number;
  pokedex: NamedAPIResource;
}

export interface Name {
  name: string;
  language: NamedAPIResource;
}

export interface PalParkEncounterArea {
  base_score: number;
  rate: number;
  area: NamedAPIResource;
}

export interface FlavorText {
  flavor_text: string;
  language: NamedAPIResource;
  version: NamedAPIResource;
}

export interface Description {
  description: string;
  language: NamedAPIResource;
}
export interface Genus {
  genus: string;
  language: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
  is_default: boolean;
  pokemon: NamedAPIResource;
}

export interface PokemonSpecies {
  id: number;
  name: string;
  order: number;
  gender_rate: number;
  capture_rate: number;
  base_happiness: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  hatch_counter: number;
  has_gender_differences: boolean;
  forms_switchable: boolean;
  growth_rate: NamedAPIResource;
  pokedex_numbers: PokemonSpeciesDexEntry;
  egg_groups: NamedAPIResource[];
  color: NamedAPIResource;
  shape: NamedAPIResource;
  evolves_from_species: NamedAPIResource;
  evolution_chain: { url: string };
  habitat: NamedAPIResource;
  generation: NamedAPIResource;
  names: Name[];
  pal_park_encounters: PalParkEncounterArea;
  flavor_text_entries: FlavorText[];
  form_descriptions: Description[];
  genera: Genus[];
  varieties: PokemonSpeciesVariety[];
}

export interface PokemonSpeciesWithEvolutionChain extends Omit<PokemonSpecies, 'evolution_chain'> {
  evolution_chain: EvolutionChain;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: NamedAPIResource;
  chain: ChainLink;
}

export interface ChainLink {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
}

export interface EvolutionDetail {
  item: NamedAPIResource;
  trigger: NamedAPIResource;
  gender: number;
  held_item: NamedAPIResource;
  known_move: NamedAPIResource;
  known_move_type: NamedAPIResource;
  location: NamedAPIResource;
  min_level: number;
  min_happiness: number;
  min_beauty: number;
  min_affection: number;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource;
  party_type: NamedAPIResource;
  relative_physical_stats: number;
  time_of_day: string;
  trade_species: NamedAPIResource;
  turn_upside_down: boolean;
}
